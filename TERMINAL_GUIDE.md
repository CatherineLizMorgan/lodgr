# Lodgr Terminal Quick Reference

## 🎯 Quick Start Commands

### Terminal 1 - Backend
```bash
cd lodgr/backend
npm install                          # First time only
npx prisma generate                  # First time only  
npx prisma migrate dev --name init   # First time only
npm run start:dev                    # Every time
```

**Success looks like:**
```
🚀 Application is running on: http://localhost:3001/api
```

---

### Terminal 2 - Frontend (New Window)
```bash
cd lodgr/frontend
npm install                          # First time only
npm run dev                          # Every time
```

**Success looks like:**
```
▲ Next.js 15.0.3
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

---

### Browser
```
http://localhost:3000
```

**You should see:**
- Beautiful Lodgr landing page
- Navigation menu (Events, Listings, Login, Sign Up)
- Hero section
- Feature cards
- Footer

---

## 🔍 How to Know It's Working

### Backend (Terminal 1)
✅ See: `Application is running on: http://localhost:3001/api`  
✅ See: 25+ "Mapped {/api/..." route messages  
✅ No red error messages  
✅ Terminal cursor is blinking (server is running)

### Frontend (Terminal 2)
✅ See: `Local: http://localhost:3000`  
✅ See: `✓ Ready in X.Xs`  
✅ No red error messages  
✅ Terminal cursor is blinking (server is running)

### Browser
✅ Page loads without errors  
✅ Can see "Lodgr" logo  
✅ Can click navigation links  
✅ Styling looks correct (blue colors, shadows, etc.)

---

## 🧪 Test the API

### Check if backend is alive
```bash
curl http://localhost:3001/api/listings
```

**Expected:** `{"data":[],"total":0,"page":1,"totalPages":0}`

### Register a user
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","firstName":"John","lastName":"Doe"}'
```

**Expected:** Returns a token and user object

---

## 🛑 How to Stop

Press `Ctrl+C` in each terminal window.

---

## 🔄 Restart

Just run the same commands again:
- Terminal 1: `npm run start:dev` (in backend/)
- Terminal 2: `npm run dev` (in frontend/)

---

## ❌ Common Issues

### "Port 3000 already in use"
```bash
# Kill whatever is on port 3000
lsof -ti:3000 | xargs kill -9
```

### "Port 3001 already in use"
```bash
# Kill whatever is on port 3001
lsof -ti:3001 | xargs kill -9
```

### "Prisma Client not generated"
```bash
cd backend
npx prisma generate
```

### Changes not appearing
- Make sure you saved the file (Cmd+S / Ctrl+S)
- Both servers auto-reload, give them a few seconds
- Check the terminal for compilation errors

---

## 📱 URLs to Remember

| What | URL |
|------|-----|
| Frontend Homepage | http://localhost:3000 |
| Login Page | http://localhost:3000/login |
| Register Page | http://localhost:3000/register |
| Listings Page | http://localhost:3000/listings |
| Backend API Root | http://localhost:3001/api |
| Register Endpoint | http://localhost:3001/api/auth/register |
| Login Endpoint | http://localhost:3001/api/auth/login |
| Get Listings | http://localhost:3001/api/listings |

---

## 💡 Pro Tips

1. **Keep both terminals visible** - Use a split terminal or two windows
2. **Watch for errors** - Both will show compile/runtime errors
3. **Auto-reload works** - Just save your files, servers restart automatically
4. **Database is local** - Your data is in `backend/prisma/dev.db`
5. **Logs appear in terminal** - API requests show up in Terminal 1

---

## 🎓 Next Steps

1. Try registering at http://localhost:3000/register
2. Use the API to create some events and listings
3. Browse listings at http://localhost:3000/listings
4. Customize the code and see changes live!

---

**Need more help?** Check `QUICK_START.md` for detailed instructions!
