const mapBestClients = (client) => {
    const mappedClient = {};
    mappedClient.id = client.Contract.Client.id;
    mappedClient.fullName = `${client.Contract.Client.firstName} ${client.Contract.Client.lastName}`;
    mappedClient.paid = client.price;
    return mappedClient;
}

const mapBestProfession = (profession) =>{
    const mappedProfession = {};
    mappedProfession.name = profession.Contract.Contractor.profession; 
    mappedProfession.total_paid=profession.price;
    return mappedProfession;
}

module.exports = {
    mapBestClients,
    mapBestProfession,
}