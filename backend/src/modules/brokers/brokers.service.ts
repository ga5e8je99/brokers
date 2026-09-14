import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Broker } from './entities/broker.entity';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import {
  autoTranslateText,
  getCategoryNames,
} from '../../common/utils/auto-translate.util';

@Injectable()
export class BrokersService {
  constructor(
    @InjectRepository(Broker)
    private readonly brokerRepository: Repository<Broker>,
  ) {}

  async findAll(category?: string, lang: string = 'ar'): Promise<any[]> {
    const query = this.brokerRepository
      .createQueryBuilder('broker')
      .where('broker.isActive = :isActive', { isActive: true })
      .orderBy('broker.sortOrder', 'ASC')
      .addOrderBy('broker.createdAt', 'ASC');

    if (category && category !== 'all') {
      query.andWhere('broker.category = :category', { category });
    }

    const brokers = await query.getMany();

    // Map according to requested language for frontend convenience
    return brokers.map((b) => this.formatLocalizedBroker(b, lang));
  }

  async findAllAdmin(): Promise<Broker[]> {
    return this.brokerRepository.find({
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findBySlug(slug: string, lang: string = 'ar'): Promise<any> {
    const broker = await this.brokerRepository.findOne({ where: { slug } });
    if (!broker) {
      throw new NotFoundException(`Broker with slug '${slug}' not found`);
    }
    return this.formatLocalizedBroker(broker, lang);
  }

  async findById(id: string): Promise<Broker> {
    const broker = await this.brokerRepository.findOne({ where: { id } });
    if (!broker) {
      throw new NotFoundException(`Broker with ID '${id}' not found`);
    }
    return broker;
  }

  async create(createBrokerDto: CreateBrokerDto): Promise<Broker> {
    const existing = await this.brokerRepository.findOne({
      where: { slug: createBrokerDto.slug },
    });
    if (existing) {
      throw new ConflictException(
        `Broker with slug '${createBrokerDto.slug}' already exists`,
      );
    }

    this.prepareLocalizedFields(createBrokerDto);
    const broker = this.brokerRepository.create(createBrokerDto);
    return this.brokerRepository.save(broker);
  }

  async update(id: string, updateBrokerDto: UpdateBrokerDto): Promise<Broker> {
    const broker = await this.findById(id);
    this.prepareLocalizedFields(updateBrokerDto);
    Object.assign(broker, updateBrokerDto);
    return this.brokerRepository.save(broker);
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    await this.findById(id);
    await this.brokerRepository.delete(id);
    return { deleted: true, id };
  }

  private prepareLocalizedFields(dto: Partial<CreateBrokerDto>) {
    // 1. Auto-fill category names
    if (dto.category) {
      const catNames = getCategoryNames(dto.category);
      if (!dto.categoryNameAr) dto.categoryNameAr = catNames.ar;
      if (!dto.categoryNameEn) dto.categoryNameEn = catNames.en;
    }

    // 2. Auto-translate badge
    if (dto.badgeAr && !dto.badgeEn) {
      dto.badgeEn = autoTranslateText(dto.badgeAr);
    } else if (dto.badgeEn && !dto.badgeAr) {
      dto.badgeAr = dto.badgeEn;
    }

    // 3. Auto-translate description
    if (dto.descriptionAr && !dto.descriptionEn) {
      dto.descriptionEn = autoTranslateText(dto.descriptionAr);
    } else if (dto.descriptionEn && !dto.descriptionAr) {
      dto.descriptionAr = dto.descriptionEn;
    }

    // 4. Auto-fill traders count
    if (!dto.tradersCountAr) {
      dto.tradersCountAr = '1M+ المتداولين';
    }
    if (!dto.tradersCountEn) {
      dto.tradersCountEn = '1M+ Global Traders';
    }
  }

  private formatLocalizedBroker(b: Broker, lang: string) {
    const isEn = lang === 'en';
    const badgeEn = b.badgeEn || autoTranslateText(b.badgeAr);
    const descEn = b.descriptionEn || autoTranslateText(b.descriptionAr);
    const catEn = b.categoryNameEn || autoTranslateText(b.categoryNameAr);
    const countEn = b.tradersCountEn || autoTranslateText(b.tradersCountAr);

    return {
      id: b.id,
      slug: b.slug,
      name: b.name,
      badge: isEn ? (badgeEn || b.badgeAr) : (b.badgeAr || badgeEn),
      badgeAr: b.badgeAr,
      badgeEn: badgeEn,
      category: b.category,
      categoryName: isEn ? (catEn || b.categoryNameAr) : (b.categoryNameAr || catEn),
      categoryNameAr: b.categoryNameAr,
      categoryNameEn: catEn,
      logo: b.logo,
      logoBg: b.logoBg,
      accentColor: b.accentColor,
      rating: Number(b.rating),
      tradersCount: isEn ? (countEn || b.tradersCountAr) : (b.tradersCountAr || countEn),
      tradersCountAr: b.tradersCountAr,
      tradersCountEn: countEn,
      description: isEn ? (descEn || b.descriptionAr) : (b.descriptionAr || descEn),
      descriptionAr: b.descriptionAr,
      descriptionEn: descEn,
      specs: b.specs,
      offer: b.offer,
      details: b.details,
      links: {
        real: b.affiliateRealLink,
        demo: b.affiliateDemoLink || b.affiliateRealLink,
      },
    };
  }
}
