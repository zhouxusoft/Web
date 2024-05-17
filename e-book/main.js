
const main = async ()=> {
    const { Book } = await import('gede-book-api')
    console.log(await Book.getList(124))
}
main()