/**
 * Create or upgrade a super-admin user.
 *
 * Usage:
 *   node scripts/create-admin.js
 *   node scripts/create-admin.js 09120000000 admin admin123 "مدیر سیستم"
 */
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const phone = process.argv[2] || '09120000000'
  const username = process.argv[3] || 'admin'
  const password = process.argv[4] || 'admin123'
  const fullName = process.argv[5] || 'مدیر سیستم'

  const passwordHash = await bcrypt.hash(password, 12)

  const existingByUsername = await prisma.user.findUnique({ where: { username } })
  if (existingByUsername && existingByUsername.phone !== phone) {
    throw new Error(`Username "${username}" is already taken by another user`)
  }

  const user = await prisma.user.upsert({
    where: { phone },
    update: {
      username,
      passwordHash,
      fullName,
      role: 'SUPER_ADMIN',
      phoneVerified: true,
      isActive: true,
    },
    create: {
      phone,
      username,
      passwordHash,
      fullName,
      role: 'SUPER_ADMIN',
      phoneVerified: true,
      isActive: true,
    },
  })

  await prisma.adminProfile.upsert({
    where: { userId: user.id },
    update: {
      isSuperAdmin: true,
      permissions: {
        users: true,
        shops: true,
        picks: true,
        finance: true,
        tickets: true,
      },
    },
    create: {
      userId: user.id,
      isSuperAdmin: true,
      permissions: {
        users: true,
        shops: true,
        picks: true,
        finance: true,
        tickets: true,
      },
    },
  })

  console.log('Admin user ready:')
  console.log(`  phone:    ${phone}`)
  console.log(`  username: ${username}`)
  console.log(`  password: ${password}`)
  console.log(`  login:    http://localhost:3000/auth/login?next=/admin`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
