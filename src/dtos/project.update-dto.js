export default class ProjectUpdateDto {
    uuid;
    title;
    description;
    managers;

    constructor(model) {
        this.uuid = model.uuid;
        this.title = model.title;
        this.description = model.description;
        this.managers = model.managers;
    }
}