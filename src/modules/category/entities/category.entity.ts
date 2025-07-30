import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { BlogCategoryEnitiy } from "src/modules/blog/entities/blog-category.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(EntityNames.Category)
export class CategoryEntity extends BaseEntity {
    @Column()
    title: string;

    // اولویت در نمایش
    @Column({ nullable: true })
    priority: number;

    @OneToMany(() => BlogCategoryEnitiy, blog => blog.category)
    blog_categories: BlogCategoryEnitiy[];
}
