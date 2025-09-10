import assert from 'assert'
import { SearchUserUseCase } from './searchUsers.js'
import type { UsersRepository } from '@/repositories/users_repositories.js'

// fake in-memory users repository (no interface enforced)
class FakeUsersRepository {
  constructor(public users: any[] = []) {}
  async searchMany(query: string, page: number): Promise<any[]> {
    const pageSize = 10
    const filtered = this.users.filter(u => (u.nome ?? '').includes(query))
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }
}

async function runTests() {
  // happy path
  const users: any[] = [
    { id: '1', nome: 'Gabriel', email: 'g@example.com' },
    { id: '2', nome: 'Ana', email: 'a@example.com' },
    { id: '3', nome: 'Gabriela', email: 'g2@example.com' },
  ]

  const repo = new FakeUsersRepository(users)
  const sut = new SearchUserUseCase(repo as unknown as UsersRepository)

  const res = await sut.execute({ query: 'Gabr', page: 1 })
  assert(Array.isArray(res.users), 'res.users should be array')
  assert.strictEqual(res.users.length, 2, 'should return 2 users matching')

  // pagination
  const many: any[] = []
  for (let i = 0; i < 25; i++) many.push({ id: String(i), nome: 'User' + i, email: `u${i}@example.com` })
  const repo2 = new FakeUsersRepository(many)
  const sut2 = new SearchUserUseCase(repo2 as unknown as UsersRepository)
  const res2 = await sut2.execute({ query: 'User', page: 3 })
  // page size 10 => page 3 returns 5 items
  assert.strictEqual(res2.users.length, 5)

  // no results
  const repo3 = new FakeUsersRepository([])
  const sut3 = new SearchUserUseCase(repo3 as unknown as UsersRepository)
  const res3 = await sut3.execute({ query: 'anything', page: 1 })
  assert.strictEqual(res3.users.length, 0)

  console.log('All tests passed')
}

runTests().catch(err => { console.error(err); process.exit(1) })
