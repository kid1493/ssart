import {Set_Axis} from './Axis_helper.js';

export class BarChart{
    constructor({chart_area,labels,datasets,color,width,height,margin,padding,y_max,y_min}){
        
        chart_area.selectAll('*').remove();

        const x_domain = labels.map(d => d);        
        const y_domain = [y_min,  (y_max != null) ? y_max : d3.max(datasets, label=>{
                return d3.max(label.data, d=>{
                    return d.value;});            
                })];        
        const Axis = Set_Axis({chart_area,x_domain,y_domain,width,height,margin,padding});

        this.color = color;
        this.y_min = y_min;
        this.x0 = Axis.x;
        this.y = Axis.y;
        this.x1 = d3.scaleBand()
            .domain(datasets.map((d,index)=>{return index}))
            .range([0, this.x0.bandwidth()]);

        this.slice = chart_area.selectAll(".slice")
            .data(datasets)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform",(d,index)=>{ return "translate(" + this.x1(index) + ",0)"; });

        this.slice.selectAll("rect")
            .data(datasets=>{return datasets.data;})
            .enter().append("rect")
            .filter(d=>{return labels.includes(d.name);})   //labels에 없는값 필터링
            .attr("width", this.x0.bandwidth()/datasets.length)
            .attr("x",d=>{ return this.x0(d.name);})
            .style("fill",d=>{return this.color(d.label_index);})
            .attr("y", d=>{ return this.y(d.value); })
            .attr("height", d=>{ return this.y(this.y_min) - this.y(d.value); });


        chart_area.node();
            
    };

    // 툴팁 효과
    tooltip(){
        const color = this.color;
        this.slice.selectAll("rect")
        .on("mouseover", function(d){ 
            d3.select(this).style("fill", d3.rgb(color(d.label_index)).darker(2));
            console.log(d);
        })
        .on("mouseout", function(d){ 
            d3.select(this).style("fill", color(d.label_index));
        });

    }
    // 애니메이션 효과
    animation(delay=1000,duration=1000){
        this.slice.selectAll("rect")
            .attr("y", d=>{ return this.y(0); })
            .attr("height", d=>{ return this.y(this.y_min) - this.y(0); })
            .transition()
            .delay(d=>{return Math.random()*delay;})
            .duration(duration)
            .attr("y", d=>{ return this.y(d.value); })
            .attr("height", d=>{ return this.y(this.y_min) - this.y(d.value); });

    }
}