class tables{
    init(connection){
        console.log('tabelas foram chamadas')
        this.connection = connection
    }
}

module.exports = new tables