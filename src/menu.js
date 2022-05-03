export function menu(chart_width, margin, chart_area, options, id) {
  const menuWidth = 30
  const menuHeight = 30
  const menuX = chart_width - margin.right - menuWidth
  
  const chartMenu = chart_area
    .append('g')
    .attr('class', 'chartMenu')
    .attr("transform", "translate(" + menuX + ",0)")
    .style('cursor', 'pointer')
    .style('width', menuWidth)
    .style('height', 30);

  chartMenu
    .append('rect')
    .attr('fill', "black")
    .style('opacity', 0)
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', 30)
    .attr('width', menuWidth)
    
  chartMenu
    .append('circle')
    .attr('class', 'menuCircle')
    .attr('fill', "black")
    .attr('cx', menuWidth/2 - 10)
    .attr('cy', 15)
    .attr('r', 3)
    .style('opacity', .2)
  
  chartMenu
    .append('circle')
    .attr('class', 'menuCircle')
    .attr('fill', "black")
    .attr('cx', menuWidth/2)
    .attr('cy', 15)
    .attr('r', 3)
    .style('opacity', .2)

  chartMenu
    .append('circle')
    .attr('class', 'menuCircle')
    .attr('fill', "black")
    .attr('cx', menuWidth/2 + 10)
    .attr('cy', 15)
    .attr('r', 3)
    .style('opacity', .2)
    
  chartMenu.on("mouseover", function (e) {
    chartMenu.selectAll(".menuCircle")
      .style('opacity', .4)
  })
  chartMenu.on("mouseleave", function (e) {
    chartMenu.selectAll(".menuCircle")
      .style('opacity', .2)
  })

  // 드롭다운 부분 d3, svg로 작성
  const dropDownWidth = 100
  const dropDownX = chart_width - margin.right - dropDownWidth

  const dropDown = chart_area
    .append('g')
    .attr('class', 'dropDown')
    .attr("transform", "translate(" + dropDownX + "," + menuHeight + ")")

  // 일일히 옵션 생성해주기
  // 어차피 함수 한개씩 일일히 지정해야한다
  let dropDownIndex = 0
  const dropDownLength = Object.keys(options.plugins.menu).length

  dropDown
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', dropDownWidth)
    .attr('height', 25 * dropDownLength + 10)
    .attr('rx', 5)
    .attr('ry', 5)
    .style('fill', 'white')
    .style('opacity', .8)
    .style('stroke', 'black')
    .style('stroke-width', '2')
  
  // if(options.plugins.menu.grid) {

  //   dropDownIndex += 1

  //   const yGridGroup = chart_area.select("g.yAxis")
  //   const xGridGroup = chart_area.select("g.xAxis")

  //   const gridButton = dropDown
  //     .append('text')
  //     .attr('x', 5)
  //     .attr('y', dropDownIndex * 25)
  //     // .attr('width', dropDownWidth)
  //     // .attr('height', 20)
  //     .text("Grid")
  //     .style('cursor', 'pointer')
  //     .style('font-weight', 'bold')
  //     .on('click', function(event) {
  //       if (xGridGroup.property("visibleStatus")==="hidden" && yGridGroup.property("visibleStatus")==="hidden") {
  //         yGridGroup
  //           .property("visibleStatus", "visible")
  //         xGridGroup
  //           .property("visibleStatus", "visible")
  //         d3.selectAll(id + " svg g.yAxis g.tick line.gridline")
  //           .style("visibility", "visible")
  //         d3.selectAll(id + " svg g.xAxis g.tick line.gridline")
  //           .style("visibility", "visible")
  //         gridButton
  //           .style('font-weight', 'bold')
  //       } else {
  //         yGridGroup
  //           .property("visibleStatus", "hidden")
  //         xGridGroup
  //           .property("visibleStatus", "hidden")
  //         d3.selectAll(id + " svg g.yAxis g.tick line.gridline")
  //           .style("visibility", "hidden")
  //         d3.selectAll(id + " svg g.xAxis g.tick line.gridline")
  //           .style("visibility", "hidden")
  //         gridButton
  //           .style('font-weight', 'normal')
  //       }
  //     })
  //   if (xGridGroup.property("visibleStatus")==="hidden" && yGridGroup.property("visibleStatus")==="hidden") {
  //     gridButton
  //       .style('font-weight', 'normal')
  //   }
  // }

  if(options.plugins.menu.xGrid) {

    dropDownIndex += 1

    const xGridGroup = chart_area.select("g.xAxis")

    const xGridButton = dropDown
      .append('text')
      .attr('x', 5)
      .attr('y', dropDownIndex * 25)
      .text("xGrid")
      .style('cursor', 'pointer')
      .style('font-weight', 'bold')
      .on('click', function(event) {
        if (xGridGroup.property("visibleStatus")==="hidden") {
          xGridGroup
            .property("visibleStatus", "visible")
          d3.selectAll(id + " svg g.xAxis g.tick line.gridline")
            .style("visibility", "visible")
          xGridButton
            .style('font-weight', 'bold')
        } else {
          xGridGroup
            .property("visibleStatus", "hidden")
          d3.selectAll(id + " svg g.xAxis g.tick line.gridline")
            .style("visibility", "hidden")
          xGridButton
            .style('font-weight', 'normal')
        }
      })

    if (xGridGroup.property("visibleStatus")==="hidden") {
      xGridButton
        .style('font-weight', 'normal')
    }
  }

  if(options.plugins.menu.yGrid) {

    dropDownIndex += 1

    const yGridGroup = chart_area.select("g.yAxis")

    const yGridButton = dropDown
      .append('text')
      .attr('x', 5)
      .attr('y', dropDownIndex * 25)
      .text("yGrid")
      .style('cursor', 'pointer')
      .style('font-weight', 'bold')
      .on('click', function(event) {
        if (yGridGroup.property("visibleStatus")==="hidden") {
          yGridGroup
            .property("visibleStatus", "visible")
          d3.selectAll(id + " svg g.yAxis g.tick line.gridline")
            .style("visibility", "visible")
          yGridButton
            .style('font-weight', 'bold')
        } else {
          yGridGroup
            .property("visibleStatus", "hidden")
          d3.selectAll(id + " svg g.yAxis g.tick line.gridline")
            .style("visibility", "hidden")
          yGridButton
            .style('font-weight', 'normal')
        }
      })

    if (yGridGroup.property("visibleStatus")==="hidden") {
      yGridButton
        .style('font-weight', 'normal')
    }
  }

  if(options.plugins.menu.background) {

    dropDownIndex += 1

    const chartBody = chart_area.select(".chartBody rect")
    console.log(chart_area)
    console.log(chartBody)
    let color = "black"
    if(options.plugins.background.color) {
      color = options.plugins.background.color
    }

    const bgButton = dropDown
      .append('text')
      .attr('x', 5)
      .attr('y', dropDownIndex * 25)
      .text("background")
      .style('cursor', 'pointer')
      .style('font-weight', 'bold')
      .on('click', function(event) {
        if (chartBody.property("visibleStatus")==="hidden") {
          chartBody
            .property("visibleStatus", "visible")
          d3.selectAll(id + " svg g.chartBody rect")
            .style("fill", color)
          bgButton
            .style('font-weight', 'bold')
        } else {
          chartBody
            .property("visibleStatus", "hidden")
          d3.selectAll(id + " svg g.chartBody rect")
            .style("fill", "none")
          bgButton
            .style('font-weight', 'normal')
        }
      })
    
    if (chartBody.property("visibleStatus")==="hidden") {
      bgButton
        .style('font-weight', 'normal')
    }
  }
  dropDown
    .style("visibility", "hidden")
    .property("visibility", "hidden")

  chartMenu.on("click", function(e) {
    console.log(dropDown.property("visibility"))
    if(dropDown.property("visibility")==="hidden") {
      dropDown
        .style("visibility", "visible")
        .property("visibility", "visible")
    } else {
      dropDown
        .style("visibility", "hidden")
        .property("visibility", "hidden")
    }
  })    
}