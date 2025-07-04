import { useRef, useState, useEffect} from "react";
import SaveMonth from "./SaveMonth"
function parseDate(str) {
    const [month, , year] = str.split('/');
    return new Date(`${year}-${String(parseInt(month)+1).padStart(2, '0')}`);
}
function addOneTMonth(str){
    const [month, , year] = str.split('/');
    return `${parseInt(month)+1}/01/${year}`

}
function generateHex() {
    const num = Math.floor(Math.random() * 256);
    const hex = num.toString(16).padStart(2, '0');
    return '#' + hex + hex + hex;
}
function subOneToMonth(str){
    const [month, , year] = str.split('/');
    if(month=="0"){
        return `${11}/01/${parseInt(year)-1}`
        
    }
    
    return `${parseInt(month)-1}/01/${year}`

}
export default function Dashboard({data, setData}){
    let actualDate = new Date()
    const [categoriesDate, setCategoryDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
    const [expansesDate, setExpansesDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
    const [yearDate, setYearDate] = useState(actualDate.getFullYear())
    const [totalDate, setTotalDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
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
    // Pie Chart
    useEffect(() => {
        if (google.visualization && google.visualization.PieChart) {
            drawChart();
        }
    }, [categoriesDate]);

    // Bar Chart
    useEffect(() => {
        if(data.storage[expansesDate]){

            if (google.visualization && google.visualization.ColumnChart && data.storage[expansesDate].expanses.length>0) {
                drawBarChart();
            }
        }
    }, [expansesDate]);

    // Line Chart
    useEffect(() => {
        if (google.visualization && google.visualization.LineChart && filterByYear().length>0) {
            drawLineChart();
        }
    }, [yearDate]);
    // console.log("odihfdihfdudfifidudf")
    // console.log([...data.storage[categoriesDate].expanses])
    function drawChart() {
        let array = Object.entries(data.storage[categoriesDate].categoryMap)
        
        array.unshift(["Categoria", "valor"])
        console.log(array)

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Gasto por categoria',
            legend: {position: "bottom"},
            is3D: true,
            colors: ["#A4A4A4", "878D96", "2F2F2F"]
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
        for (let i = 0; i < array.length; i++) {
            array[i].push(i%2?"#d9d9d9":"#9c9c9c")
        }
        array.unshift(["Categoria", "valor", {role: "style"}])
        console.log(array)

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Maiores despesas do mês',
            legend: {position: "bottom"},
            animation: {
                startup: true,
                duration: 1000,
                easing: "out",
            },
            colors: ["#d9d9d9"]
        };

        let chart = new google.visualization.ColumnChart(barchartRef.current);

        google.visualization.events.addListener(chart, 'error', (id, message)=>{console.log(id, message)});
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
            colors: ["#9c9c9c"]

        };

        let chart = new google.visualization.LineChart(linechartRef.current);

        chart.draw(charData, options);
    }
    return(<>
        <div className="flex">
            <div>
                <div style={{border:"1px solid #d9d9d9", width: "450px", height:"500px"}}>
                    <input
                        type="month"
                        value={parseDate(categoriesDate).toISOString().split('T')[0].substring(0, parseDate(categoriesDate).toISOString().split('T')[0].length-3)}
                        onChange={(e) => {
                            const date = new Date(e.target.value);
                            setCategoryDate(`${(date.getMonth()+1)%12}/01/${date.getMonth()+1==12?date.getFullYear()+1:date.getFullYear()}`);
                        }}
                    />
                    <div ref={piechartRef} style={{width: "440px", height:"450px"}}></div>
                </div>
                <SaveMonth data={data} setData={setData}/>
                <input
                type="month"
                value={parseDate(totalDate).toISOString().split('T')[0].substring(0, parseDate(totalDate).toISOString().split('T')[0].length-3)}
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    setTotalDate(`${(date.getMonth()+1)%12}/01/${date.getMonth()+1==12?date.getFullYear()+1:date.getFullYear()}`);
                }}
            />  
                
                <div>{data.storage[totalDate]?<p>
                    <>{data.storage[totalDate].total} </>
                    {data.storage[subOneToMonth(totalDate)].expanses.length>0 && data.storage[subOneToMonth(totalDate)]?
                        <span className={data.storage[totalDate].total>data.storage[subOneToMonth(totalDate)]?"Maior":"Menor"}><i className="bi bi-caret-down-fill"></i> {((data.storage[totalDate].total/data.storage[subOneToMonth(totalDate)].total-1)*100).toFixed(2)}%</span>:<></>
                    }</p>:"No data"
                    
                }
                </div>
            </div>
            <div>
                <div style={{border:"1px solid #d9d9d9", width: "450px", height:"500px"}}>
                    <input
                        type="month"
                        value={parseDate(expansesDate).toISOString().split('T')[0].substring(0, parseDate(expansesDate).toISOString().split('T')[0].length-3)}
                        onChange={(e) => {
                            console.log(parseDate(expansesDate).toISOString().split('T')[0].substring(0, parseDate(expansesDate).toISOString().split('T')[0].length-3))
                            const date = new Date(e.target.value);
                            setExpansesDate(`${(date.getMonth()+1)%12}/01/${date.getMonth()+1==12?date.getFullYear()+1:date.getFullYear()}`);
                        }}
                    />
                    {data.storage[expansesDate] ? <>{data.storage[expansesDate].expanses.length>0 ? <div ref={barchartRef} style={{width: "440px", height:"450px"}}></div>:<p>No data</p>}</>:<p>No data</p>}
                </div>
                <div style={{border:"1px solid #d9d9d9", width: "450px", height:"500px"}}>
                    <input
                        type="number" id="ano" name="ano" min="1900" max="2100" step="1"
                        value={yearDate}
                        onChange={(e) => {
                            setYearDate(e.target.value);
                        }}
                    />
                    {filterByYear().length>0 ? <div ref={linechartRef} style={{width: "440px", height:"450px"}}></div>:<p>No data</p>}
                </div>
            </div>
        </div>
    
    </>)
}