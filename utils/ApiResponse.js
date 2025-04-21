export default class ApiResponse {

    constructor(statusCode = 200, message = "ok", data = [], errors = []) {

        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
        this.errors = errors
    }

    static UserResponse(statusCode = 200, message = "ok", data = [], errors = []) {

        const userData = { _id: data._id, firstName: data.firstName, lastName: data.lastName, userhandle: data.userhandle, email: data.email, profilePicture: data.profilePicture }
        return new ApiResponse(200, "ok", userData);
    }

    static PostResponse(statusCode = 200, message = "ok", data = [], errors = []) {

        let postData = [];

        if (!Array.isArray(data))
            postData = { _id: data._id, title: data.title, content: data.content, createdAt: data.createdAt, updatedAt: data.updatedAt, userId: data.userId }
        else
            postData = data;
        return new ApiResponse(statusCode, message, postData, errors);
    }
}