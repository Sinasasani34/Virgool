import { BaseEntity } from "src/common/abstracts/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, Like, OneToMany, OneToOne } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { ProfileEntity } from "./profile.entity";
import { BlogEntity } from "src/modules/blog/entities/blog.entity";
import { BlogLikesEntity } from "src/modules/blog/entities/like.entity";
import { BlogBookmarkEntity } from "src/modules/blog/entities/bookmark.entity";
import { BlogCommentEntity } from "src/modules/blog/entities/comment.entity";
import { ImageEntity } from "src/modules/image/entities/image.entity";
import { Roles } from "src/common/enums/role.enum";
import { FollowEntity } from "./follow.entity";
import { UserStatus } from "../enum/status.enum";

@Entity(EntityNames.User)
export class UserEntity extends BaseEntity {
    @Column({ unique: true, nullable: true })
    username: string;

    @Column({ unique: true, nullable: true })
    phone: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true, type: "numeric", default: 0 })
    balance: number;

    @Column({ default: Roles.User })
    role: string;

    @Column({
        type: 'enum',
        enum: UserStatus,
        nullable: true
    })
    status: string | null;

    @Column({ nullable: true })
    new_email: string;

    @Column({ nullable: true })
    new_phone: string;

    @Column({ nullable: true, default: false })
    verify_email: boolean;

    @Column({ nullable: true, default: false })
    verify_phone: boolean;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    otpId: number;

    @Column({ nullable: true })
    profileId: number;

    @OneToOne(() => OtpEntity, otp => otp.user, { nullable: true })
    @JoinColumn()
    otp: OtpEntity;

    @OneToOne(() => ProfileEntity, profile => profile.user, { nullable: true })
    @JoinColumn()
    profile: ProfileEntity;

    @OneToMany(() => BlogEntity, blog => blog.author)
    blogs: BlogEntity[];

    @OneToMany(() => BlogLikesEntity, like => like.user)
    blog_likes: BlogLikesEntity[];

    @OneToMany(() => BlogBookmarkEntity, bookmark => bookmark.user)
    blog_bookmarks: BlogBookmarkEntity[];

    @OneToMany(() => BlogCommentEntity, comment => comment.user)
    blog_comments: BlogCommentEntity[];

    @OneToMany(() => ImageEntity, image => image.user)
    images: ImageEntity[];

    @OneToMany(() => FollowEntity, follow => follow.following)
    followers: FollowEntity[];

    @OneToMany(() => FollowEntity, follow => follow.follower)
    following: FollowEntity[];

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}