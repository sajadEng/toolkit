function Ip() {

    const API_KEY = 'at_1jU7YddzIe0xfpROcqDbY4yTQEQKc'

    
    async function main() {
        const ipinput = document.querySelector('input.ip');
        // const ipgoBtn = document.querySelector('.ip-go-btn');
        const ipAddressText = document.querySelector('.ip-info--adress--result-text');
        const ipLocationText = document.querySelector('.ip-info--location--result-text');
        const ipTimezoneText = document.querySelector('.ip-info--timezone--result-text');
        const ipIspText = document.querySelector('.ip-info--isp--result-text');
        const ipAddress = ipinput.value;
        setDefaultData();
        activeAnimation();
        emptyMap();
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`;
        let response = fetch(url);
        response.then(response => response.json())
        .then(data => {
            if (!checkApiKey(data)) { delete localStorage.apiKey; }
            ipAddressText.innerHTML = getIpAdress(data);
            ipLocationText.innerHTML = getIpLocation(data);
            ipTimezoneText.innerHTML = getIpTimezone(data);
            ipIspText.innerHTML = getIpIsp(data);
            mapTheCoords(data.location.lat, data.location.lng);
            deActiveAnimation();
        }).catch(error => {
            setTimeout(deActiveAnimation, 1000);
        });
    }
    
    function getIpIsp(data) {
        return data.isp;
    }
    
    function getIpTimezone(data) {
        return `UTC ${data.location.timezone}`;
    }
    
    function getIpAdress(data) {
        return data.ip;
    }

    function getIpLocation(data) {
        return `${data.location.city}, ${data.location.country}`
    }
    
    // MAP 
    function mapTheCoords(latitude, langitude) {
        console.log(API_KEY);
        var mymap = L.map('mapid');
        
        mymap.setView([latitude, langitude], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        
        var marker = L.marker([latitude, langitude]).addTo(mymap);
        mymap.on('locationfound', marker);
    }
    
    function emptyMap() {
       // create a new element
        var newElement = document.createElement('div');
        newElement.id = 'mapid';
    
        // get the existing element
        var existingElement = document.getElementById('mapid');
    
        // append the new element as the next sibling of the existing element
        existingElement.insertAdjacentElement('afterend', newElement);
    
        document.querySelector('#mapid').remove();
    }


    // UI EFFECTS
    function deActiveAnimation() {
        document.querySelectorAll('.ip-info--title').forEach(title => {
            title.classList.remove('active');
        })
        document.querySelectorAll('.ip-info--result').forEach(result => {
            result.classList.remove('active');
        })    
    }

    function activeAnimation() {
        document.querySelectorAll('.ip-info--title').forEach(title => {
            title.classList.add('active');
        })
        document.querySelectorAll('.ip-info--result').forEach(result => {
            result.classList.add('active');
        })
    }

    // Miseclonous
    function setDefaultData() {
        const ipAddressText = document.querySelector('.ip-info--adress--result-text');
        const ipLocationText = document.querySelector('.ip-info--location--result-text');
        const ipTimezoneText = document.querySelector('.ip-info--timezone--result-text');
        const ipIspText = document.querySelector('.ip-info--isp--result-text');
        ipAddressText.innerHTML = 'unkown';
        ipLocationText.innerHTML = 'unkown';
        ipTimezoneText.innerHTML = 'unkown';
        ipIspText.innerHTML = 'unkown';
    }

    function checkApiKey(data) {
        if (data.code >= 400 && data.code <= 500) {
            return false;
        } else {
            return true;
        }
    }
    

    return (
        <div className="ip-container">
        <div className="ip-header">
            <img src="/src/images/ip/pattern-bg-desktop.png" alt="" className="ip-bg-pattern-img" />
            <h1 className="ip">IP Adress Tracker</h1>
            <label htmlFor="ip input" className="ip">
                <input type="text" placeholder="Search for any IP address" name="ip input" className="ip" onKeyUp={event => {
                    if (event.key === 'Enter') main();
                    console.log(event.key);
                }} />
                <div className="ip-go-btn">
                    <img src="/src/images/ip/icon-arrow.svg" className="ip" alt=">" onClick={main} />
                </div>
            </label>

            <div className="info-from-ip--container">
                <div className="ip-info ip-info--adress">
                    <div className="ip-info--title ip-info--adress--title">IP ADRESS</div>
                    <div className="ip-info--result ip-info--adress--result">
                        <p className="ip-info--adress--result-text">unknown</p>
                    </div>
                </div>
                <div className="ip-info ip-info--location">
                    <div className="ip-info--title ip-info--location--title">LOCATION</div>
                    <div className="ip-info--result ip-info--location--result">
                        <p className="ip-info--location--result-text">unknown</p>
                    </div>
                </div>
                <div className="ip-info ip-info--timezone">
                    <div className="ip-info--title ip-info--timezone--title">TIME ZONE</div>
                    <div className="ip-info--result ip-info--timezone--result">
                        <p className="ip-info--timezone--result-text">unknown</p>
                    </div>
                </div>
                <div className="ip-info ip-info--isp">
                    <div className="ip-info--title ip-info--isp--title">ISP</div>
                    <div className="ip-info--result ip-info--isp--result">
                        <p className="ip-info--isp--result-text">unknown</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="mapid"></div>
        </div>
    )
}

export default Ip
