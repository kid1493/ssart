import capture from "./saveSvgAsPng.js";
import { Chart } from "./function.js";

// 메뉴 아이콘 생성
function menuIcon(chart_width, width, margin, options, chart_area) {
  const menuWidth = 30;
  const menuHeight = 30;

  let menuX = chart_width - margin.right - menuWidth;
  if (
    options.plugins.legend.position &&
    options.plugins.legend.position == "left"
  ) {
    menuX = width - margin.right - menuWidth;
  }

  const chartMenu = chart_area
    .append("g")
    .attr("class", "chartMenu")
    .attr("transform", "translate(" + menuX + "," + 0 + ")")
    .style("cursor", "pointer")
    .style("width", menuWidth)
    .style("height", menuHeight);

  chartMenu
    .append("rect")
    .attr("fill", "black")
    .style("opacity", 0)
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", menuHeight)
    .attr("width", menuWidth);

  chartMenu
    .append("circle")
    .attr("class", "menuCircle")
    .attr("fill", "black")
    .attr("cx", menuWidth / 2 - 10)
    .attr("cy", 15)
    .attr("r", 3)
    .style("opacity", 0.2);

  chartMenu
    .append("circle")
    .attr("class", "menuCircle")
    .attr("fill", "black")
    .attr("cx", menuWidth / 2)
    .attr("cy", 15)
    .attr("r", 3)
    .style("opacity", 0.2);

  chartMenu
    .append("circle")
    .attr("class", "menuCircle")
    .attr("fill", "black")
    .attr("cx", menuWidth / 2 + 10)
    .attr("cy", 15)
    .attr("r", 3)
    .style("opacity", 0.2);

  chartMenu.on("mouseover", function (e) {
    chartMenu.selectAll(".menuCircle").style("opacity", 0.4);
  });
  chartMenu.on("mouseleave", function (e) {
    chartMenu.selectAll(".menuCircle").style("opacity", 0.2);
  });

  return chartMenu
};

// dropdown 창 생성
function createDropDown(width, margin, options, chart_area, dropDownWidth, dropDownX) {
  if (
    options.plugins.legend.position &&
    options.plugins.legend.position == "left"
  ) {
    dropDownX = width - margin.right - dropDownWidth;
  }

  const dropDown = chart_area
    .append("g")
    .attr("class", "dropDown")
    .attr("transform", "translate(" + dropDownX + "," + margin.top + ")");

  const dropDownLength = Object.keys(options.plugins.menu).length;

  dropDown
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", dropDownWidth)
    .attr("height", 25 * dropDownLength + 10)
    .attr("rx", 5)
    .attr("ry", 5)
    .style("fill", "white")
    .style("opacity", 0.8)
    .style("stroke", "black")
    .style("stroke-width", "2");

  return dropDown
};

export function menu(chart_width, width, margin, chart_area, options, id, param) {
  // 메뉴 아이콘 생성
  const chartMenu = menuIcon(chart_width, width, margin, options, chart_area)
  
  // 드롭다운 생성
  const dropDownWidth = 100;
  let dropDownX = chart_width - margin.right - dropDownWidth;
  const dropDown = createDropDown(width, margin, options, chart_area, dropDownWidth, dropDownX);

  const yGridGroup = chart_area.select("g.yAxis");
  const xGridGroup = chart_area.select("g.xAxis");

  const gridButton = dropDown.append("text");
  const xGridButton = dropDown.append("text");
  const yGridButton = dropDown.append("text");
  const download = dropDown.append("text");
  const legendButton = dropDown.append("g");

  let dropDownIndex = 0;
  if (options.plugins.menu.grid) {
    dropDownIndex += 1;

    gridButton
      .attr("x", dropDownWidth - 8)
      .attr("y", dropDownIndex * 25)
      // .attr('width', dropDownWidth)
      // .attr('height', 20)
      .text("Grid")
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        if (
          xGridGroup.property("visibleStatus") === "hidden" &&
          yGridGroup.property("visibleStatus") === "hidden"
        ) {
          yGridGroup.property("visibleStatus", "visible");
          xGridGroup.property("visibleStatus", "visible");
          d3.selectAll(id + " svg g.yAxis g.tick line.gridline").style(
            "visibility",
            "visible"
          );
          d3.selectAll(id + " svg g.xAxis g.tick line.gridline").style(
            "visibility",
            "visible"
          );
          gridButton.style("fill", "black");
          xGridButton.style("fill", "black");
          yGridButton.style("fill", "black");
        } else {
          yGridGroup.property("visibleStatus", "hidden");
          xGridGroup.property("visibleStatus", "hidden");
          d3.selectAll(id + " svg g.yAxis g.tick line.gridline").style(
            "visibility",
            "hidden"
          );
          d3.selectAll(id + " svg g.xAxis g.tick line.gridline").style(
            "visibility",
            "hidden"
          );
          gridButton.style("fill", "#aaaaaa");
          xGridButton.style("fill", "#aaaaaa");
          yGridButton.style("fill", "#aaaaaa");
        }
      });
    if (
      xGridGroup.property("visibleStatus") === "hidden" &&
      yGridGroup.property("visibleStatus") === "hidden"
    ) {
      gridButton.style("fill", "#aaaaaa");
    }
  }

  if (options.plugins.menu.xGrid) {
    dropDownIndex += 1;

    xGridButton
      .attr("x", dropDownWidth - 8)
      .attr("y", dropDownIndex * 25)
      .text("xGrid")
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        if (xGridGroup.property("visibleStatus") === "hidden") {
          xGridGroup.property("visibleStatus", "visible");
          d3.selectAll(id + " svg g.xAxis g.tick line.gridline").style(
            "visibility",
            "visible"
          );
          xGridButton.style("fill", "black");

          if (yGridGroup.property("visibleStatus") === "visible") {
            gridButton.style("fill", "black");
          }
        } else {
          xGridGroup.property("visibleStatus", "hidden");
          d3.selectAll(id + " svg g.xAxis g.tick line.gridline").style(
            "visibility",
            "hidden"
          );
          xGridButton.style("fill", "#aaaaaa");

          if (yGridGroup.property("visibleStatus") === "hidden") {
            gridButton.style("fill", "#aaaaaa");
          }
        }
      });

    if (xGridGroup.property("visibleStatus") === "hidden") {
      xGridButton.style("font-weight", "normal");
    }
  }

  if (options.plugins.menu.yGrid) {
    dropDownIndex += 1;

    yGridButton
      .attr("x", dropDownWidth - 8)
      .attr("y", dropDownIndex * 25)
      .text("yGrid")
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        if (yGridGroup.property("visibleStatus") === "hidden") {
          yGridGroup.property("visibleStatus", "visible");
          d3.selectAll(id + " svg g.yAxis g.tick line.gridline").style(
            "visibility",
            "visible"
          );
          yGridButton.style("fill", "black");

          if (xGridGroup.property("visibleStatus") === "visible") {
            gridButton.style("fill", "black");
          }
        } else {
          yGridGroup.property("visibleStatus", "hidden");
          d3.selectAll(id + " svg g.yAxis g.tick line.gridline").style(
            "visibility",
            "hidden"
          );
          yGridButton.style("fill", "#aaaaaa");

          if (xGridGroup.property("visibleStatus") === "hidden") {
            gridButton.style("fill", "#aaaaaa");
          }
        }
      });

    if (yGridGroup.property("visibleStatus") === "hidden") {
      yGridButton.style("fill", "#aaaaaa");
    }
  }

  if (options.plugins.menu.background) {
    dropDownIndex += 1;

    const chartBackground = chart_area.select(".chartBackground rect");
    // console.log(chart_area)
    // console.log(chartBackground)
    let color = "#f1f3f5";
    if (options.plugins.background?.color) {
      color = options.plugins.background.color;
    }

    const bgButton = dropDown
      .append("text")
      .attr("x", dropDownWidth - 8)
      .attr("y", dropDownIndex * 25)
      .text("background")
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        if (chartBackground.property("visibleStatus") === "hidden") {
          chartBackground.property("visibleStatus", "visible");
          d3.selectAll(id + " svg g.chartBackground rect").style("fill", color);
          bgButton.style("fill", "black");
        } else {
          chartBackground.property("visibleStatus", "hidden");
          d3.selectAll(id + " svg g.chartBackground rect").style(
            "fill",
            "none"
          );
          bgButton.style("fill", "#aaaaaa");
        }
      });

    if (chartBackground.property("visibleStatus") === "hidden") {
      bgButton.style("fill", "#aaaaaa");
    }
  }

  if (options.plugins.menu.download) {
    dropDownIndex += 1;
    download
      .attr("x", dropDownWidth - 8)
      .attr("y", dropDownIndex * 25)
      .text("Download")
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        // div 태그를 가져옴
        let divId = this.parentNode.parentNode.parentNode.getAttribute("id");
        console.log(divId);

        // 클릭시 메뉴 닫음.
        if (dropDown.property("visibility") === "hidden") {
          dropDown
            .style("visibility", "visible")
            .property("visibility", "visible");
        } else {
          dropDown
            .style("visibility", "hidden")
            .property("visibility", "hidden");
        }

        // 이미지 저장
        saveSvgAsPng(
          document.getElementById(divId).getElementsByTagName("svg")[0],
          "ssart-chart"
        );
      });
  }

  if (options.plugins.menu.legend) {
    dropDownIndex += 1;
    const legendDropDownWidth = 70
    const legendDropDownX = dropDownX - legendDropDownWidth
    const legendDropDownY = margin.top + dropDownIndex * 25 - 10
    const legendDropDown = chart_area
      .append("g")
      .attr("class", "legendDropDown")
      .attr("transform", "translate(" + legendDropDownX + "," + legendDropDownY + ")");
    
    legendDropDown
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", legendDropDownWidth)
      .attr("height", 25 * 4 + 10)
      .attr("rx", 5)
      .attr("ry", 5)
      .style("fill", "white")
      .style("opacity", 0.8)
      .style("stroke", "black")
      .style("stroke-width", "2");

    legendDropDown
      .append("text")
      .attr("x", legendDropDownWidth - 8)
      .attr("y", 25)
      .attr("class", "top")
      .text("top")
      .attr("text-anchor", "end")
      .style("fill", "#aaaaaa")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        param.options.plugins.legend.position = "top"
        Chart(id, param)
      });

    legendDropDown
      .append("text")
      .attr("x", legendDropDownWidth - 8)
      .attr("y", 50)
      .attr("class", "bottom")
      .text("bottom")
      .attr("text-anchor", "end")
      .style("fill", "#aaaaaa")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        param.options.plugins.legend.position = "bottom"
        Chart(id, param)
      });

    legendDropDown
      .append("text")
      .attr("x", legendDropDownWidth - 8)
      .attr("y", 75)
      .text("left")
      .attr("class", "left")
      .attr("text-anchor", "end")
      .style("fill", "#aaaaaa")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        param.options.plugins.legend.position = "left"
        Chart(id, param)
      });

    legendDropDown
      .append("text")
      .attr("x", legendDropDownWidth - 8)
      .attr("y", 100)
      .text("right")
      .attr("class", "right")
      .attr("text-anchor", "end")
      .style("fill", "#aaaaaa")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        param.options.plugins.legend.position = "right"
        Chart(id, param)
      });
    
    legendDropDown
      .select("." + options.plugins.legend.position)
      .style("fill", "black")
    
    legendDropDown.style("visibility", "hidden").property("visibility", "hidden");

    legendButton
      .append("text")
      .attr("x", dropDownWidth - 8)
      .attr("y", dropDownIndex * 25)
      .text("Legend")
      .attr("text-anchor", "end")
      .style("font-family", "sans-serif")
      .style("cursor", "pointer")
      .style("user-select", "none")
      .on("click", function (event) {
        if (legendDropDown.property("visibility") === "hidden") {
          legendDropDown.style("visibility", "visible").property("visibility", "visible");
        } else {
          legendDropDown.style("visibility", "hidden").property("visibility", "hidden");
        }
      });     
  }

  dropDown.style("visibility", "hidden").property("visibility", "hidden");

  chartMenu.on("click", function (e) {
    if (dropDown.property("visibility") === "hidden") {
      dropDown.style("visibility", "visible").property("visibility", "visible");
    } else {
      dropDown.style("visibility", "hidden").property("visibility", "hidden");
    }
  });
}
