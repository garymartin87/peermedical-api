const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index');

const userModel = require('../models/user');
const articleModel = require('../models/article');

describe('/users', () => {
    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    describe('unauthorized request', () => {
        it('should return 401 when no authorization header', async () => {
            const res = await request(app).get('/users');
            expect(res.status).to.equal(401);
        });
    });

    describe('get users', () => {
        it('should return all users', async () => {
            const users = [
                {
                    name: 'Gary Martin',
                    avatar:
                        'https://scontent.faep11-1.fna.fbcdn.net/v/t1.0-9/18341879_768394413320390_6488937265712347698_n.jpg',
                },
                {
                    name: 'Alberto Gomez',
                    avatar:
                        'https://scontent.faep11-1.fna.fbcdn.net/v/t1.0-9/18341879_768394413320390_6488937265712347698_n.jpg',
                },
            ];

            await userModel.insertMany(users);

            const res = await request(app)
                .get('/users')
                .set('Authorization', process.env.API_TOKEN);
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
        });
    });

    describe('create user', () => {
        it('should return user when data is valid', async () => {
            const res = await request(app)
                .post('/users')
                .set('Authorization', process.env.API_TOKEN)
                .send({
                    name: 'Alberto Dominguez',
                    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
                });
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('name', 'Alberto Dominguez');
        });
    });
});

describe('/articles', () => {
    beforeEach(async () => {
        await articleModel.deleteMany({});
    });

    describe('get articles', done => {
        const user = new userModel({
            name: 'Gary Martin',
            avatar:
                'https://scontent.faep11-1.fna.fbcdn.net/v/t1.0-9/18341879_768394413320390_6488937265712347698_n.jpg',
        })
            .save()
            .then(() => {});

        it('should return all articles', async () => {
            const articles = [
                {
                    userId: user._id,
                    title: 'How to Write Clean Code',
                    text:
                        'Overview of JavaScript Best Practices and Coding Conventions',
                    tags: ['development'],
                },
                {
                    userId: user._id,
                    title: 'An Overview of Android Storage',
                    text: 'Storage is this thing we are all aware of',
                    tags: ['development'],
                },
            ];

            await articleModel.insertMany(articles);

            const res = await request(app)
                .get('/articles')
                .set('Authorization', process.env.API_TOKEN);
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
        });
    });

    describe('delete article', done => {
        const user = new userModel({
            name: 'Gary Martin',
            avatar:
                'https://scontent.faep11-1.fna.fbcdn.net/v/t1.0-9/18341879_768394413320390_6488937265712347698_n.jpg',
        })
            .save()
            .then(() => {});

        it('should delete the article', async () => {
            const articleData = {
                userId: user._id,
                title: 'How to Write Clean Code',
                text:
                    'Overview of JavaScript Best Practices and Coding Conventions',
                tags: ['development'],
            };

            const article = await new articleModel(articleData).save();

            const res = await request(app)
                .delete(`/articles/${article._id}`)
                .set('Authorization', process.env.API_TOKEN);
            expect(res.status).to.equal(200);
        });
    });
});
