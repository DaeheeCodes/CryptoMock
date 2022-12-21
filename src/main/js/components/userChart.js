import { useCallback } from "react"
import { Group } from "@visx/group";
import { scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Line, LinePath } from "@visx/shape";
import { extent, bisector } from 'd3-array';
import { LinearGradient } from '@visx/gradient';
import { GridRows, GridColumns } from '@visx/grid';
import { useTooltip, TooltipWithBounds, defaultStyles, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { GlyphCircle } from '@visx/glyph';
import { curveNatural } from "@visx/curve";
import { MarkerCircle } from "@visx/marker";

import React from 'react';

function UserChart({ data, width, height }) {

    // tooltip parameters
    const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip();

    // define margins from where to start drawing the chart
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    // defining inner measurements
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // data for lines
    const data1 = data.filter(function (el) {
        return el.type === "RENEWABLE"
    });

    const data2 = data.filter(function (el) {
        return el.type === "TOTAL"
    });

    const series = [data2]

    //colors for lines
    const colors = {
      white: "#FFFFFF",
      black: "#1B1B1B",
      gray: "#98A7C0",
      darkGray: "#2A2A2A",
      accent: "#40FEAE",
      darkAccent: "#256769"
    };

    // Defining selector functions
    const getRD = (d) => d.amount;
    const getDate = (d) => d.year;
    const bisectDate = bisector((d) => d.year).left;

    // get data from a year
    const getD = (year) => {
        const output = data.filter(function (el) {
            return el.year === year
        })
        return output
    }
    
    // to remove comma from date
    const formatDate = (year) => year.toString()
    
    // Defining scales
    // horizontal, x scale
    const timeScale = scaleLinear({
        range: [0, innerWidth],
        domain: extent(data, getDate),
        nice: true
    })

    // vertical, y scale
    const rdScale = scaleLinear({
        range: [innerHeight, 0],
        domain: extent(data, getRD),
        nice: true,
    });

    // defining tooltip styles
    const tooltipStyles = {
        ...defaultStyles,
        minWidth: 60,
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white',
    };

    const handleTooltip = useCallback((event) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = timeScale.invert(x - margin.left); // get Date from the scale

        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d1;


        showTooltip({
            tooltipData: getD(d.year),
            tooltipLeft: x,
            tooltipTop: rdScale(getRD(d))
        })
    })

    return (
        <div style={{ position: 'relative' }}>
            <svg width={width} height={height} >
            <rect x={0} y={0} width={width} height={height} style={{
          fill: colors.black
        }} rx={14} />
                <Group left={margin.left} top={margin.top}>
                   
        <AxisLeft
      hideZero
                        scale={rdScale}
                        stroke={colors.darkGray}
        strokeWidth={1.5}
        tickStroke={colors.darkGray}
        tickLabelProps={() => ({
          fill: colors.gray,
          textAnchor: "end",
          verticalAnchor: "middle"
        })}
        tickFormat={(value) => `$${value}`}
      />

                    {/* <AxisBottom
                        scale={timeScale}
                        stroke={'#EDF2F7'}
                        tickFormat={formatDate}
        strokeWidth={0}
        tickStroke={colors.darkGray}
        tickLabelProps={() => ({
          fill: colors.gray,
          textAnchor: "middle",
          verticalAnchor: "middle"
        })}
      /> */}
      
      <LinearGradient
        id="background-gradient"
        from={colors.darkAccent}
        to={colors.black}
      />

                        <LinePath
                            data={data2}
                            x={(d) => timeScale(getDate(d)) }
                            y={(d) => rdScale(getRD(d)) }
                            fill="url('#background-gradient')"
        curve={curveNatural}
                            />

      <LinearGradient
        id="line-gradient"
        from={colors.accent}
        to={colors.darkAccent}
      />
      <MarkerCircle id="marker-circle" fill={colors.gray} size={1.5} refX={2} />
                    

                        <LinePath
                            data={data2}
                            x={(d) => timeScale(getDate(d)) }
                            y={(d) => rdScale(getRD(d)) }
                            stroke="url('#line-gradient')"
        strokeWidth={3}
        curve={curveNatural}
        markerEnd="url(#marker-circle)"
                            />
                      {tooltipData ?(
                        <GlyphCircle 
                            left={tooltipLeft - margin.left}
                            top={tooltipTop + 2}
                            size={110}
                            fill={colors.accent}
                            stroke={'white'}
                            strokeWidth={2} /> ) : null}
                    <rect x={0} y={0} width={1000} height={500} onTouchStart={handleTooltip} fill={'transparent'}
                        onTouchMove={handleTooltip}
                        onMouseMove={handleTooltip}
                        onMouseLeave={() => hideTooltip()}
                      />
                </Group>
            </svg>
            {/* render a tooltip */}
            {tooltipData ? (
                <TooltipWithBounds key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                > 
                <p>{`Total Spend: $${getRD(tooltipData[1])}`}</p>
                <p>{`Year: ${getDate(tooltipData[1])}`}</p>
                </TooltipWithBounds>
            ) : null}
        </div>
    )
}

export default UserChart