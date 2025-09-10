import { SearchUserUseCase } from './searchUsers.js'

class FakeUsersRepository {
  constructor(public users: any[] = []) {}
  async searchMany(query: string, page: number) {
    const pageSize = 10
    const filtered = this.users.filter(u => (u.nome ?? '').includes(query))
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }
}

async function main() {
  const many: any[] = []
  for (let i = 0; i < 25; i++) many.push({ id: String(i), nome: 'User' + i, email: `u${i}@example.com` })

  const repo = new FakeUsersRepository(many)
  const sut = new SearchUserUseCase(repo as any)

  for (let page = 1; page <= 4; page++) {
    const res = await sut.execute({ query: 'User', page })
    console.log(`Page ${page} - items: ${res.users.length}`)
    console.log(res.users.map(u => u.nome).join(', '))
    console.log('---')
  }
}

main().catch(err => { console.error(err); process.exit(1) })
