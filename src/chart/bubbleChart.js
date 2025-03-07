import {Axis_Option, Set_Axis} from '../module/axis_helper.js';

export class BubbleChart{
    constructor({id, chart_area,labels,datasets,color,width,height,margin,padding,scales}){

        // chart_area.selectAll('*').remove();
        chart_area.selectAll('.chartBody').remove();
        chart_area.selectAll('.xAxis').remove();
        chart_area.selectAll('.yAxis').remove();

        const axis_option = Axis_Option(labels,datasets,scales,0.2);
        const x_domain = axis_option.x_domain;
        const x_type = axis_option.x_type;
        const y_min = axis_option.y_min;
        const y_max = axis_option.y_max;
        const r_min = axis_option.r_min;
        const r_max = axis_option.r_max;
        const r_size_min = axis_option.r_size_min;
        const r_size_max = axis_option.r_size_max;
        const fillopacity = axis_option.fillopacity;
        const y_domain = axis_option.y_domain

        const Axis = Set_Axis({chart_area,x_domain,y_domain,width,height,margin,padding,scales,x_type});

        const r_domain = [0,(r_max != null) ? r_max : d3.max(datasets, label=>{
            return d3.max(label.data, d=>{
                return d.r;});            
            })];        
        
        this.color = color;
        this.y_min = y_min;
        this.y_max - y_max;
        this.x = Axis.x;
        this.y = Axis.y;

        this.r = d3.scaleLinear()
            .domain(r_domain).nice()
            .range([r_size_min, r_size_max]);

        this.ChartBody = chart_area
            .append("g")
            .attr("class","ssart")
            .attr("class", "chartBody")
        
        this.slice = this.ChartBody.selectAll(".slice")
            .data(datasets)
            .enter().append("g")
            .attr("class","ssart")
            .attr("class", "slice")
            // .attr("id", (d, i) => `${id}-chart-legend-${i}`)
        if (x_type == "band"){
            this.slice.attr("transform", "translate(" + this.x.bandwidth()/2 + "," + 0 + ")")
        }
        else{
            this.slice.attr("transform", "translate(" + 0 + "," + 0 + ")")
        }

        this.ChartBody.attr("pointer-events", "none")
        this.slice.selectAll(".data")
            .data(datasets=>{return datasets.data;})
            .enter().append("circle")
            .filter(d=>{return this.x(d.x)>= 0 && this.x(d.x) <= width - margin.left && this.y(d.y)>= 0 && this.y(d.y) <= height - margin.top;})
            .attr("class","ssart")
            .attr("class","data")
            .attr("x",  d=> { return this.x(d.x); } )
            .attr("y", d=> { return this.y(d.y); } )
            .attr("transform", (d)=>{
                return "translate(" + this.x(d.x) + "," + this.y(d.y) + ")";
            })
            .attr("r", (d) => { return this.r(d.r) })
            .attr("pointer-events", "all")
            .style("fill",d=>{return this.color(d.label_index);})
            .style("fill-opacity", fillopacity)
            // .on("mouseover", onMouseOver)
            // .on("mouseout", onMouseOut);

        chart_area.node();
        
    }

    // 툴팁 효과
    tooltip(){
        const tooltop = document.getElementById('ssart-tooltip');
        const color = this.color;
        const r = this.r;
        this.ChartBody.selectAll(".data")
        .on("mouseover", function(d){ 

            d3.select(this).style("fill", d3.rgb(color(d.label_index)).darker(2));

            tooltop.style.opacity = "1.0";
        })
            .on("mousemove", function (d) {
                const name = d.label;
                const x = d.x;
                const y =  d.y;
                const r_value = d.r;
            // tooltop.innerText = "x : " + value +"\n" + "y : " + name +"\n" + "r : " +key ; // 값 + 데이터 
                tooltop.innerHTML = `
                        <svg style="width: 16px; height: 16px">
                            <rect width="10px" height="10px" x="1" y="5" fill="${d3.rgb(color(d.label_index))}" stroke="white" stroke-width="10%"></rect>
                        </svg>
                        <text style="font-size: 15px; font-weight: 700; margin-bottom: 3px;">${name} (${x}, ${y}, ${r_value})</text>
                        `
                tooltop.style.left = event.pageX + 20 + "px";
                tooltop.style.top = event.pageY + 20 + "px";
                d3.select(this).attr("r", r(r_value) * 1.3)
        })
            .on("mouseout", function (d) { 
                const r_value = d.r;                
                d3.select(this).style("fill", color(d.label_index));
                d3.select(this).attr("r", r(r_value))
                tooltop.style.opacity = "0";
        });
    }

    animation(delay=1000,duration=1000){
        this.slice.selectAll(".data")
            .attr("r", 0)
            .transition()
            .delay(d=>{return Math.random()*delay;})
            .duration(duration)
            .attr("r", d=>{ return this.r(d.r); })
    }
}




