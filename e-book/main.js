
const main = async ()=> {
    const { Magazine } = await import('gede-book-api')
    console.log(await Magazine.getIssues(805))
}
main()