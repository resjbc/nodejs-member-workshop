const isProd = process.env.PORD == 'true';
export const AppEnvironment = {
    dbHost: isProd ? 'mongodb://localhost/member_db' : 'mongodb://localhost/member_db'
};