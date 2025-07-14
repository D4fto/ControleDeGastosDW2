import { useRef, useState, useEffect} from "react";
import SaveMonth from "./SaveMonth"
import "./Dashboard.css"

function parseDate(str) {
    const [month, , year] = str.split('/');
    return new Date(`${year}-${String(parseInt(month)+1).padStart(2, '0')}`);
}
function addOneTMonth(str){
    const [month, , year] = str.split('/');
    return `${parseInt(month)+1}/01/${year}`

}
function subOneToMonth(str){
    const [month, , year] = str.split('/');
    if(month=="0"){
        return `${11}/01/${parseInt(year)-1}`
        
    }
    
    return `${parseInt(month)-1}/01/${year}`

}
export default function Dashboard({data, setData}){
    if(typeof google === "undefined"){
        return(<></>)
    }
    let actualDate = new Date()
    const [categoriesDate, setCategoryDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
    const [expansesDate, setExpansesDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
    const [yearDate, setYearDate] = useState(actualDate.getFullYear())
    const [totalDate, setTotalDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
    const [color, setColor] = useState(true)
    const piechartRef = useRef()
    const barchartRef = useRef()
    const linechartRef = useRef()

    function filterByYear(){
        let array = Object.entries(data.storage)
        array = array.filter((x) => {
            return x[0].includes(yearDate) && x[1].expanses.length>0
        })
        return array
    }
    function limparMes(){
        const newData = {...data}
        newData.storage[`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`]={
            total: 0,
            categoryMap: {},
            expanses: []
        }
        setData(newData)
    }

    function switchColor(){

    }

    useEffect(()=>{
        if(!data.storage[categoriesDate]){
            data.storage[categoriesDate]={
                total: 0,
                categoryMap: {},
                expanses: []
            }
        }
        if(!data.storage[expansesDate]){
            data.storage[expansesDate]={
                total: 0,
                categoryMap: {},
                expanses: []
            }
        }
        if(!data.storage[totalDate]){
            data.storage[totalDate]={
                total: 0,
                categoryMap: {},
                expanses: []
            }
        }
    }, [categoriesDate, expansesDate, totalDate])


    useEffect(() => {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            drawChart();
            drawBarChart();
            drawLineChart();
        });
    }, []);
    useEffect(() => {
        if (google.visualization && google.visualization.PieChart) {
            drawChart();
        }
    }, [categoriesDate, data, color]);
    useEffect(() => {
        if(data.storage[expansesDate]){

            if (google.visualization && google.visualization.ColumnChart && data.storage[expansesDate].expanses.length>0) {
                drawBarChart();
            }
        }
    }, [expansesDate, data, color]);
    useEffect(() => {
        if (google.visualization && google.visualization.LineChart && filterByYear().length>0) {
            drawLineChart();
        }
    }, [yearDate, data, color]);
    function drawChart() {
        let array = Object.entries(data.storage[categoriesDate].categoryMap)
        array.map((x)=>{
            x[1]=x[1]/100
        })
        array.unshift(["Categoria", "valor"])


        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Gasto por categoria',
            legend: {position: "bottom"},
            is3D: true,
            colors: color?["#41EAD4", "#FF0022", "#011627"]:["#A4A4A4", "878D96", "2F2F2F"],
            
        };

        let chart = new google.visualization.PieChart(piechartRef.current);

        chart.draw(charData, options);
    }
    function drawBarChart() {
        let array = [...data.storage[expansesDate].expanses]
        array = array.map((x) => {
            if(Array.isArray(x)){
                return [...x]
            }
            return x
        })
        if(array.length>5){
            array.length=5
        }
        array.map((x)=>{
            x[1]=x[1]/100
        })
        for (let i = 0; i < array.length; i++) {
            color?
            array[i].push(i%2?"#011627":"#FF0022")
            :
            array[i].push(i%2?"#d9d9d9":"#9c9c9c")
        }
        array.unshift(["Despesa", "valor", {role: "style"}])

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Maiores despesas do mês',
            legend: {position: "bottom"},
            animation: {
                startup: true,
                duration: 1000,
                easing: "out",
            },
            colors: ["#011627"]
        };

        let chart = new google.visualization.ColumnChart(barchartRef.current);

        chart.draw(charData, options);

    }
    function drawLineChart() {
        let array = filterByYear()
        array.sort((a,b) => {
            let dateA = new Date(addOneTMonth(a[0]))
            let dateB = new Date(addOneTMonth(b[0]))
            return dateA.getMonth() - dateB.getMonth()
        })
        array.map((x) => {
            let date = new Date(addOneTMonth(x[0]))
            x[0] = x[0] = date.toLocaleString("default", {month: "long"})
            x[1] = x[1].total
            
        })
        
        array.map((x)=>{
            x[1] = x[1]/100
        })
        array.unshift(["Categoria", "valor"])

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Gasto anual',
            legend: {position: "bottom"},
            animation: {
                startup: true,
                duration: 1000,
                easing: "out"
            },
            colors: color?["#41EAD4"]:["#9c9c9c"]

        };

        let chart = new google.visualization.LineChart(linechartRef.current);

        chart.draw(charData, options);
    }
    return(<>
        <div className="flex Dashboard">
            <div>
                <div style={{border:".0625rem solid #d9d9d9", width: "22.25rem", minHeight:"25rem"}} className="ContainerGrafico">
                    <input
                        type="month"
                        value={parseDate(categoriesDate).toISOString().split('T')[0].substring(0, parseDate(categoriesDate).toISOString().split('T')[0].length-3)}
                        onChange={(e) => {
                            if(e.target.value){

                                const date = new Date(e.target.value);
                                setCategoryDate(`${(date.getMonth()+1)%12}/01/${date.getMonth()+1==12?date.getFullYear()+1:date.getFullYear()}`);
                            }
                        }}
                    />
                    <div ref={piechartRef} style={{width: "100%", height:"85%"}}></div>
                </div>
                <div className="DashboardButtons flex">
                    <SaveMonth data={data} setData={setData}/>
                    <button onClick={limparMes}>LIMPAR MÊS</button>
                    <button onClick={()=>{setColor(!color)}} ><img src={color?"/colors.svg":"/nocolors.svg"} className="ColorIcon"></img></button>
                </div>
                <div className="Total">
                    <input
                    type="month"
                    value={parseDate(totalDate).toISOString().split('T')[0].substring(0, parseDate(totalDate).toISOString().split('T')[0].length-3)}
                    onChange={(e) => {
                        if(e.target.value){
                    
                            const date = new Date(e.target.value);
                            setTotalDate(`${(date.getMonth()+1)%12}/01/${date.getMonth()+1==12?date.getFullYear()+1:date.getFullYear()}`);
                        }
                    }}/>
                    
                    <div>
                        <p>Total Gasto Esse Mês</p>
                        {data.storage[totalDate]?<p>
                        
                        <>{(data.storage[totalDate].total/100).toLocaleString("pt-BR", {style: "currency",currency: "BRL",minimumFractionDigits: 2})} </>
                        {data.storage[subOneToMonth(totalDate)].expanses.length>0 && data.storage[subOneToMonth(totalDate)]?
                            <span className={data.storage[totalDate].total>data.storage[subOneToMonth(totalDate)].total?"RelacaoMesAnterior Aumentou":"RelacaoMesAnterior Abaixou"}><i className={"bi "+(data.storage[totalDate].total>data.storage[subOneToMonth(totalDate)].total?"bi-caret-up-fill":"bi-caret-down-fill")}></i> {((data.storage[totalDate].total/data.storage[subOneToMonth(totalDate)].total-1)*100).toFixed(2)}%</span>:<></>
                        }</p>:"No data"
                    
                    }
                    </div>
                </div>
            </div>
            <div>
                <div style={{border:".0625rem solid #d9d9d9", width: "29.1875rem", height:"21.0625rem"}} className="ContainerGrafico">
                    <input
                        type="month"
                        value={parseDate(expansesDate).toISOString().split('T')[0].substring(0, parseDate(expansesDate).toISOString().split('T')[0].length-3)}
                        onChange={(e) => {
                            if(e.target.value){

                                const date = new Date(e.target.value);
                                setExpansesDate(`${(date.getMonth()+1)%12}/01/${date.getMonth()+1==12?date.getFullYear()+1:date.getFullYear()}`);
                            }
                        }}
                    />
                    {data.storage[expansesDate] ? <>{data.storage[expansesDate].expanses.length>0 ? <div ref={barchartRef} style={{width: "100%", height:"85%"}}></div>:<p>No data</p>}</>:<p>No data</p>}
                </div>
                <div style={{border:".0625rem solid #d9d9d9", width: "29.1875rem", height:"17.125rem"}} className="ContainerGrafico">
                    <input
                        type="number" id="ano" name="ano" min="1900" max="2100" step="1"
                        value={yearDate}
                        onChange={(e) => {
                            setYearDate(e.target.value);
                        }}
                    />
                    {filterByYear().length>0 ? <div ref={linechartRef} style={{width: "100%", height:"85%"}}></div>:<p>No data</p>}
                </div>
            </div>
        </div>
    
    </>)
}