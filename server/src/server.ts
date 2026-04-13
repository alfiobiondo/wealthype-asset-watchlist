import { app } from './app';
import { prisma } from './lib/prisma';

async function test() {
	const users = await prisma.user.findMany();
	console.log(users);
}

test();

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
