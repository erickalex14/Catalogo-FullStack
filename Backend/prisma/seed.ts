import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_USER_EMAIL ?? 'admin@catalogo.local';
  const passwordPlain = process.env.SEED_USER_PASSWORD ?? 'Admin123456';
  const name = process.env.SEED_USER_NAME ?? 'Administrador';

  const password = await bcrypt.hash(passwordPlain, 10);

  await prisma.user.upsert({
    where: { email },
    update: { password, name },
    create: { email, password, name },
  });

  console.log(`Seeded user: ${email}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
