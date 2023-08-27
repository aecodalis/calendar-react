/* eslint-disable no-console */
import React, { Component } from "react";
import moment from "moment";

import Timeline, {
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  CursorMarker,
  SidebarHeader,
  CustomHeader,
  TimelineHeaders,
  DateHeader,
} from "react-calendar-timeline/lib";

var minTime = moment().add(-6, "months").valueOf();
var maxTime = moment().add(6, "months").valueOf();

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
};

var HeaderFormats = {
  year: {
    long: "YYYY",
    mediumLong: "YYYY",
    medium: "YYYY",
    short: "YY",
  },
  month: {
    long: "MMMM YYYY",
    mediumLong: "MMMM",
    medium: "MMMM",
    short: "MMM YY",
  },
  week: {
    long: "w",
    mediumLong: "w",
    medium: "w",
    short: "w",
  },
  day: {
    long: "dddd, LL",
    mediumLong: "dddd",
    medium: "ddd D",
    short: "D",
  },
  hour: {
    long: "dddd, HH:00",
    mediumLong: "HH:00",
    medium: "HH:00",
    short: "HH",
  },
  minute: {
    long: "HH:mm",
    mediumLong: "HH:mm",
    medium: "HH:mm",
    short: "mm",
  },
  second: {
    long: "mm:ss",
    mediumLong: "mm:ss",
    medium: "mm:ss",
    short: "ss",
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);

    const groups = [
      { id: 1, title: "group 1" },
      { id: 2, title: "group 2" },
    ];

    const items = [
      {
        id: 1,
        group: 1,
        title: "item 1",
        start: moment(),
        end: moment().add(1, "month"),
      },
      {
        id: 2,
        group: 2,
        title: "item 2",
        start: moment().add(-0.5, "month"),
        end: moment().add(0.5, "month"),
      },
      {
        id: 3,
        group: 1,
        title: "item 3",
        start: moment().add(2, "month"),
        end: moment().add(3, "month"),
      },
    ];
    const defaultTimeStart = moment().startOf("month").toDate();
    const defaultTimeEnd = moment().startOf("month").add(1, "month").toDate();

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      format: false,
      showHeaders: false,
    };
  }

  handleCanvasClick = (groupId, time) => {
    console.log("Canvas clicked", groupId, moment(time).format());
  };

  handleCanvasDoubleClick = (groupId, time) => {
    console.log("Canvas double clicked", groupId, moment(time).format());
  };

  handleCanvasContextMenu = (group, time) => {
    console.log("Canvas context menu", group, moment(time).format());
  };

  handleItemClick = (itemId, _, time) => {
    console.log("Clicked: " + itemId, moment(time).format());
  };

  handleItemSelect = (itemId, _, time) => {
    console.log("Selected: " + itemId, moment(time).format());
  };

  handleItemDoubleClick = (itemId, _, time) => {
    console.log("Double Click: " + itemId, moment(time).format());
  };

  handleItemContextMenu = (itemId, _, time) => {
    console.log("Context Menu: " + itemId, moment(time).format());
  };

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id,
            })
          : item
      ),
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time,
            })
          : item
      ),
    });

    console.log("Resized", itemId, time, edge);
  };

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    // if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
    //   updateScrollCanvas(minTime, maxTime);
    // } else if (visibleTimeStart < minTime) {
    //   updateScrollCanvas(
    //     minTime,
    //     minTime + (visibleTimeEnd - visibleTimeStart)
    //   );
    // } else if (visibleTimeEnd > maxTime) {
    //   updateScrollCanvas(
    //     maxTime - (visibleTimeEnd - visibleTimeStart),
    //     maxTime
    //   );
    // } else {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    // }
    console.log(visibleTimeStart, visibleTimeEnd, updateScrollCanvas);
  };

  handleZoom = (timelineContext, unit) => {
    console.log("Zoomed", timelineContext, unit);
  };

  onBoundsChange = (canvasTimeStart, canvasTimeEnd) => {
    console.log("Scrolled data:", canvasTimeStart, " ", canvasTimeEnd);
  };

  moveResizeValidator = (action, item, time) => {
    if (time < new Date().getTime()) {
      var newTime =
        Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000);
      return newTime;
    }

    return time;
  };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarWidth={250}
        sidebarContent={<div>Above The Left</div>}
        canMove={true}
        canResize="right"
        canSelect={true}
        canChangeGroup
        itemsSorted
        itemTouchSendsClick={false}
        stackItems={false}
        itemHeightRatio={0.75}
        lineHeight={40}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        minZoom={24 * 60 * 60 * 1000}
        maxZoom={365.24 * 86400 * 1000}
        dragSnap={60 * 60 * 1000}
        onCanvasClick={this.handleCanvasClick}
        onCanvasDoubleClick={this.handleCanvasDoubleClick}
        onCanvasContextMenu={this.handleCanvasContextMenu}
        onItemClick={this.handleItemClick}
        onItemSelect={this.handleItemSelect}
        onItemContextMenu={this.handleItemContextMenu}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onItemDoubleClick={this.handleItemDoubleClick}
        onTimeChange={this.handleTimeChange}
        onBoundsChange={this.loadItemsData}
        onZoom={this.handleZoom}
        moveResizeValidator={this.moveResizeValidator}
        buffer={3}
      >
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </Timeline>
    );
  }
}
