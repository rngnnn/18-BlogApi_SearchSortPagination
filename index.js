// .env dosyasını yüklemek için dotenv modülünü çağırıyoruz
require('dotenv').config();

const express = require('express');
const cookieSession = require('cookie-session');
const app = express();

// PORT ve SECRET_KEY çevresel değişkenlerini tanımlıyoruz
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SECRET_KEY;

// Middlewares:
app.use(express.json());
require('express-async-errors');

// Oturum Yapılandırması (cookie-session kullanımı)
app.use(
  cookieSession({
    name: 'session',
    keys: [SECRET_KEY], // Çevresel değişken üzerinden gelen SECRET_KEY kullanılıyor
    maxAge: 24 * 60 * 60 * 1000, // 24 saatlik geçerlilik süresi
  })
);

// DB bağlantısı (dbConnection.js üzerinden)
require('./src/configs/dbConnection');

// Authentication Middleware
const authentication = async (req, res, next) => {
  req.user = null;

  if (req.session._id) {
    const user = await User.findById(req.session._id);

    if (user && user.password === req.session.password) {
      req.user = user;
    } else {
      req.session = null;
    }
  }

  next();
};
app.use(authentication);

// Ana rota ve diğer rotalar:
app.get('/', (req, res) => {
  res.send({
    msg: 'WELCOME TO BLOG API',
    session: req.session,
    isLogin: !!req.user,
  });
});

app.use('/blog', require('./src/routes/blog'));
app.use('/user', require('./src/routes/user'));
app.use('/auth', require('./src/routes/auth'));

// Hata yakalama middleware'i
app.use(require('./src/middlewares/errorHandler'));

// Sunucuyu başlatıyoruz
app.listen(PORT, () => console.log(`Running: http://127.0.0.1:${PORT}`));
