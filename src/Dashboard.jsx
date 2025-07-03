import { useRef, useState} from "react";
import SaveMonth from "./SaveMonth"
export default function Dashboard({data, setData}){
    let actualDate = new Date()
    const [categoriesDate, setCategoryDate] = useState(`${actualDate.getMonth()}/01/${actualDate.getFullYear()}`)
    const piechartRef = useRef()
    const barchartRef = useRef()

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
    console.log("odihfdihfdudfifidudf")
    console.log([...data.storage[categoriesDate].expanses])
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
        array.length=5
        for (let i = 0; i < array.length; i++) {
            array[i].push(i%2?"#d9d9d9":"#757575")
        }
        array.unshift(["Categoria", "valor", {role: "style"}])
        console.log(array)

        let charData = google.visualization.arrayToDataTable(array);

        let options = {
            title: 'Gasto por categoria',
            legend: {position: "bottom"}
        };

        let chart = new google.visualization.ColumnChart(barchartRef.current);

        chart.draw(charData, options);
    }
    return(<>
        <div className="flex">
            <div>
                <div ref={piechartRef} style={{width: "450px", height:"500px", border:"1px solid #d9d9d9"}}></div>
                <SaveMonth data={data} setData={setData}/>
            </div>
            <div>
                <div ref={barchartRef} style={{width: "450px", height:"500px", border:"1px solid #d9d9d9"}}></div>
            </div>
        </div>
    
    </>)
}