export default class ApiResponseDto {
    uuid;
    data;
    status;
    type;
    created_at;

    constructor(model) {
        this.uuid = model.uuid;
        this.data = model.data;
        this.status = model.status;
        this.type = model.type;
        this.created_at = model.created_at;
    }
}