export default class ApiResponse {

    constructor(statusCode = 200, message = "ok", data = [], errors=[]) {

        this.statusCode = statusCode;
        this.message = message;
        this.data = this.getData(data);
        this.success = statusCode < 400;
        this.errors = errors
    }

    getData(data) {
        if (Array.isArray(data) && !data.length) return [];

        return { _id: data._id, firstName: data.firstName, lastName: data.lastName, userhandle: data.userhandle, email: data.email, proefilePicture: data.profilePicture }
    }
}