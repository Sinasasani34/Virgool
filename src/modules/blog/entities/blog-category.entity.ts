import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";

@Entity(EntityNames.BlogCategory)
export class BlogCategoryEnitiy extends BaseEntity {
    @Column()
    blogId: number;

    @Column()
    categoryId: number;

    @ManyToOne(() => BlogEntity, blog => blog.categories)
    blog: BlogEntity;
    @ManyToOne(() => CategoryEntity, category => category.blog_categories, { onDelete: 'CASCADE' })
    category: CategoryEntity;
}