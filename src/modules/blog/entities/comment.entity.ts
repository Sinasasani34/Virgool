import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity(EntityNames.BlogComments)
export class BlogCommentEntity extends BaseEntity {
    @Column()
    text: string;

    @Column({ default: false })
    accepted: boolean;

    @Column()
    blogId: number;

    @Column()
    userId: number;
    // for asnwers of comments
    @Column({ nullable: true })
    parentId: number | null;
    // connection
    @ManyToOne(() => UserEntity, user => user.blog_comments, { onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToOne(() => BlogEntity, blog => blog.comments, { onDelete: 'CASCADE' })
    blog: BlogEntity;
    // parents for comment
    @ManyToOne(() => BlogCommentEntity, parent => parent.children, { onDelete: 'CASCADE' })
    parent: BlogCommentEntity;

    @OneToMany(() => BlogCommentEntity, comment => comment.parent)
    @JoinColumn({ name: "parent" })
    children: BlogCommentEntity[];

    @CreateDateColumn()
    created_at: Date;
}