import csurf from 'csurf';
const csrfProtection = csurf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  }
});

const getCsrfToken = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

export { csrfProtection, getCsrfToken };