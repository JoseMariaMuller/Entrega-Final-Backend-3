class GenericDAO {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.find();
    }

    async getBy(params) {
        return await this.model.findOne(params);
    }

    async save(doc) {
        return await this.model.create(doc);
    }

    async update(id, doc) {
        return await this.model.findByIdAndUpdate(id, { $set: doc }, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = GenericDAO;