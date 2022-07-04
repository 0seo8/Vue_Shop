//임의로 넣어둔거라 user파트 작성할 때 삭제해주세요 :)


export default {
  namespaced: true,
  state() {
    return {
      accounts:[
        {
          'id': 'VD8ptOYFJzjOjDz9yisy',
          'bankName': '우리은행',
          'bankCode': '020',
          'accountNumber': '1234-XXX-XXXXXX',
          'balance': 0
        },
        {
          'id': 'au14PwT6zuNM7vDxurzg',
          'bankName': 'KB국민은행',
          'bankCode': '004',
          'accountNumber': '123-XX-XXXX-XXX',
          'balance': 3000000
        },
        {
          'id': 'dtG7D65BPJtGXgzG8LbI',
          'bankName': '신한은행',
          'bankCode': '088',
          'accountNumber': '123-XXX-XXXXXX',
          'balance': 3000000
        }
      ],
      user: {
        'email': 'thesecon@gmail.com',
        'displayName': 'ParkYoungWoong',
        'profileImg': 'https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png'
      }
    }
  },

}
