
class tables{
    
    init(connection){
            console.log('tabelas foram chamadas')
            this.connection = connection
            this.criarTabela()
            
    }

    criarTabela(){
        const table =
        `CREATE TABLE IF NOT EXISTS public.hunterfyterrenos
        (
            user_id character(16) COLLATE pg_catalog."default" NOT NULL,
            "PARCELID" character(64) COLLATE pg_catalog."default" NOT NULL,
            "FLOODZONE" character(64) COLLATE pg_catalog."default",
            date date DEFAULT CURRENT_DATE,
            dateandtime timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP(6),
            CONSTRAINT hunterfyterrenos_pkey PRIMARY KEY ("PARCELID")
        )`
        this.connection.query(table, error => {
            if(error){
                console.log(error)
            }else{
                console.log("tabela criada com sucesso")
            }

        })
    }

    
}

module.exports = new tables