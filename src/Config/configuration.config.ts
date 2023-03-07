const development = {
    Mongoose: "",
    PORT: "3000",
    JWT_SECRET:""
};

const stage = {
    Mongoose: "",
    PORT: "3000",
    JWT_SECRET:""
};

const production = {
    Mongoose: "",
    PORT: "3000",
    JWT_SECRET:""
};

const config = process.env.NODE_ENV == 'production' ? production : process.env.NODE_ENV == 'stage' ? stage : development;

export default () => (
    config
);