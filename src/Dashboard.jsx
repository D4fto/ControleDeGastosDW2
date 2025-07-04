import { useRef, useState} from "react";
import SaveMonth from "./SaveMonth"
function parseCategoriesDate(str) {
    const [month, , year] = str.split('/');
    return new Date(`${year}-${String(parseInt(month)+1).padStart(2, '0')}-01`);
}
function addOneTMonth(str){
    const [month, , year] = str.split('/');
    return `${parseInt(month)+1}/01/${year}`

}
function subOneToMonth(str){
    const [month, , year] = str.split('/');
    if(month=="0"){
        console.log(`${12}/01/${parseInt(year)-1}`)
        return `${11}/01/${parseInt(year)-1}`
        
    }
    
    return `${parseInt(month)-1}/01/${year}`

}
export default function Dashboard({data, setData}){
    let actualDate = new Date()
    const [categoriesDate, setCategoryDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
    const piechartRef = useRef()
    const barchartRef = useRef()
    const linechartRef = useRef()

    console.log(categoriesDate)

    if(!data.storage[categoriesDate]){
        data.storage[categoriesDate]={
            total: 0,
            categoryMap: {},
            expanses: []
        }
    }

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    google.charts.setOnLoadCallback(drawBarChart);
    google.charts.setOnLoadCallback(drawLineChart);
    // console.log("odihfdihfdudfifidudf")
    // console.log([...data.storage[categoriesDate].expanses])
    function drawChart() {
        let array = Object.entries(data.storage[categoriesDate].categoryMap)
        array.unshift(["Categoria", "valor"])

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Gasto por categoria',
            legend: {position: "bottom"}
        };

        let chart = new google.visualization.PieChart(piechartRef.current);

        chart.draw(charData, options);
    }
    function drawBarChart() {
        let array = [...data.storage[categoriesDate].expanses]
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
            array[i].push(i%2?"#d9d9d9":"#757575")
        }
        array.unshift(["Categoria", "valor", {role: "style"}])
        // console.log(array)

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Gasto por categoria',
            legend: {position: "bottom"}
        };

        let chart = new google.visualization.ColumnChart(barchartRef.current);

        chart.draw(charData, options);
    }
    function drawLineChart() {
        let array = Object.entries(data.storage)
        array = array.filter((x) => {
            return x[0].includes(new Date(addOneTMonth(categoriesDate)).getFullYear()) && x[1].expanses.length>0
        })
        array.sort((a,b) => {
            let dateA = new Date(addOneTMonth(a[0]))
            let dateB = new Date(addOneTMonth(b[0]))
            return dateA.getMonth() - dateB.getMonth()
        })
        array.map((x) => {
            let date = new Date(addOneTMonth(x[0]))
            x[0] = x[0] = date.toLocaleString("default", {month: "long"})
            x[1] = x[1].total
            console.log(x)
            
        })
        
        
        array.unshift(["Categoria", "valor"])

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Gasto por categoria',
            legend: {position: "bottom"}
        };

        let chart = new google.visualization.LineChart(linechartRef.current);

        chart.draw(charData, options);
    }
    return(<>
        <div className="flex">
            <div>
                <div ref={piechartRef} style={{width: "450px", height:"500px", border:"1px solid #d9d9d9"}}></div>
                <SaveMonth data={data} setData={setData}/>
                <input
                type="date"
                value={parseCategoriesDate(categoriesDate).toISOString().split('T')[0]}
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    setCategoryDate(`${(date.getMonth()+1)%12}/01/${date.getMonth()+1==12?date.getFullYear()+1:date.getFullYear()}`);
                }}
            />
                <p>
                    {data.storage[categoriesDate].total} 
                    {data.storage[subOneToMonth(categoriesDate)].expanses.length>0 && data.storage[subOneToMonth(categoriesDate)]?
                    <p>{((data.storage[categoriesDate].total/data.storage[subOneToMonth(categoriesDate)].total-1)*100).toFixed(2)}%</p>:<></>
                    }
                    </p>
            </div>
            <div>
                <div ref={barchartRef} style={{width: "450px", height:"500px", border:"1px solid #d9d9d9"}}></div>
                <div ref={linechartRef} style={{width: "450px", height:"500px", border:"1px solid #d9d9d9"}}></div>
            </div>
        </div>
    
    </>)
}