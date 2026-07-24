export default async function handler(req, res) {
    // Permite que seu frontend acesse essa API sem bloqueios
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { nick } = req.query;

    if (!nick) {
        return res.status(400).send("Faltou informar o nick do personagem.");
    }

    try {
        // A Vercel vai até o servidor do Mega MU buscar os dados
        const response = await fetch(`http://megamu.net/getdata.php?char=${nick}&default=SEUNICK`);
        const data = await response.text();
        
        // Devolve os dados para o seu painel
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Erro no servidor da Vercel ao buscar no Mega MU.");
    }
}