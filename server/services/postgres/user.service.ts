import { UserStatic } from '../../types/databases/models/postgres/user';
import bcrypt from "bcryptjs";

const UserService = class {
    private userModel: UserStatic;
    constructor(model) {
        this.userModel = model;
    }
    findOne({ id }) {
        return this.userModel.findOne({ where: { id } });
    }
    findOneByEmail({ email }) {
        return this.userModel.findOne({ where: { email } });
    }
    findOneByGitHubId({ id }) {
        return this.userModel.findOne({ where: { github_id: id } });
    }
    createUser({ name, email, signedBy, password }) {
        this.userModel.beforeCreate(async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 12);
            }
        });
        return this.userModel.create({
            user_name: name,
            signed_by: signedBy,
            email,
            password,
        });
    }
    createUserGitHub({ name, signedBy, githubId, avatarURL, profileURL }) {
        return this.userModel.create({
            user_name: name,
            signed_by: signedBy,
            github_id: githubId,
            avatar_url: avatarURL,
            profile_url: profileURL,
        });
    }
    deleteOne({ id }) {
        return this.userModel.destroy({
            where: { id },
        });
    }
};

export default UserService;