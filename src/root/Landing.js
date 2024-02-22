import React, { useEffect } from 'react';
import go from 'gojs';

const Landing = () => {
    useEffect(() => {

        let $ = go.GraphObject.make;
        let myDiagram = $(go.Diagram, "myDiagramDiv",
            {
                initialContentAlignment: go.Spot.Center,
                layout: $(go.TreeLayout),
                "undoManager.isEnabled": true,


                allowCopy: false,
                allowDelete: false,

                maxSelectionCount: 1,
                validCycle: go.Diagram.CycleDestinationTree,
                "clickCreatingTool.archetypeNodeData": {
                    name: "(new person)",
                    title: "",
                    comments: ""
                },
                "clickCreatingTool.insertPart": function (loc) {  // method override must be function, not =>
                    const node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    if (node !== null) {
                        this.diagram.select(node);
                        this.diagram.commandHandler.scrollToPart(node);
                        this.diagram.commandHandler.editTextBlock(node.findObject("NAMETB"));
                    }
                    return node;
                },
                layout:
                    $(go.TreeLayout,
                        {
                            treeStyle: go.TreeLayout.StyleLastParents,
                            arrangement: go.TreeLayout.ArrangementHorizontal,
                            // properties for most of the tree:
                            angle: 90,
                            layerSpacing: 35,
                            // properties for the "last parents":
                            alternateAngle: 90,
                            alternateLayerSpacing: 35,
                            alternateAlignment: go.TreeLayout.AlignmentBus,
                            alternateNodeSpacing: 20
                        }),
                "undoManager.isEnabled": true
            });

        myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                $(go.Panel, "Vertical",
                    $(go.TextBlock,
                        { margin: 2, stroke: "black", font: "bold 16px sans-serif" },
                        new go.Binding("text", "name")),
                    $(go.TextBlock,
                        { margin: 2, stroke: "black" },
                        new go.Binding("text", "designation")),
                    $(go.TextBlock,
                        { margin: 2, stroke: "black" },
                        new go.Binding("text", "team")),
                    $(go.TextBlock,
                        { margin: 2, stroke: "black" },
                        new go.Binding("text", "reportingTo"))
                ),
                $(go.Shape, "Rectangle",
                    { fill: "transparent", stroke: "white", strokeWidth: 2 },
                    new go.Binding("fill", "color"))
            );
        myDiagram.layout = $(go.TreeLayout, { angle: 90, layerSpacing: 35 });




        myDiagram.addDiagramListener("Modified", e => {
            const button = document.getElementById("SaveButton");
            if (button) button.disabled = !myDiagram.isModified;
            const idx = document.title.indexOf("*");
            if (myDiagram.isModified) {
                if (idx < 0) document.title += "*";
            } else {
                if (idx >= 0) document.title = document.title.slice(0, idx);
            }
        });


        const levelColors = ["#AC193D", "#2672EC", "#8C0095", "#5133AB",
            "#008299", "#D24726", "#008A00", "#094AB2"];

        myDiagram.layout.commitNodes = function () {
            go.TreeLayout.prototype.commitNodes.call(this);
            myDiagram.layout.network.vertexes.each(v => {
                if (v.node) {
                    const level = v.level % (levelColors.length);
                    const color = levelColors[level];
                    const shape = v.node.findObject("SHAPE");
                    if (shape) shape.stroke = $(go.Brush, "Linear", { 0: color, 1: go.Brush.lightenBy(color, 0.05), start: go.Spot.Left, end: go.Spot.Right });
                }
            });
        };


        function mayWorkFor(node1, node2) {
            if (!(node1 instanceof go.Node)) return false;  // must be a Node
            if (node1 === node2) return false;  // cannot work for yourself
            if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
            return true;
        }

        function textStyle() {
            return { font: "9pt  Segoe UI,sans-serif", stroke: "white" };
        }

        function findHeadShot(pic) {
            if (!pic) return "images/HSnopic.png";
            return "images/HS" + pic;
        }






        let model = $(go.TreeModel);
        model.nodeDataArray =
            [
                { key: "ceo", name: "ceo", designation: "1", team: "Team 1", reportingTo: "" },
                { key: "Manager", name: "Manager", parent: "ceo", designation: "1", team: "Team 1", reportingTo: "" },

                { key: "Employee 1", parent: "Manager", name: "Employee 1", designation: "2", team: "Team 1", reportingTo: "Manager" },
                { key: "Employee 1", parent: "Manager", name: "Employee 2", designation: "2", team: "Team 1", reportingTo: "Manager" },

            ];
        myDiagram.model = model;


        myDiagram.nodeTemplate =
            $(go.Node, "Spot",
                {
                    selectionObjectName: "BODY",
                    mouseEnter: (e, node) => node.findObject("BUTTON").opacity = node.findObject("BUTTONX").opacity = 1,
                    mouseLeave: (e, node) => node.findObject("BUTTON").opacity = node.findObject("BUTTONX").opacity = 0,
                    mouseDragEnter: (e, node, prev) => {
                        const diagram = node.diagram;
                        const selnode = diagram.selection.first();
                        if (!mayWorkFor(selnode, node)) return;
                        const shape = node.findObject("SHAPE");
                        if (shape) {
                            shape._prevFill = shape.fill;
                            shape.fill = "darkred";
                        }
                    },
                    mouseDragLeave: (e, node, next) => {
                        const shape = node.findObject("SHAPE");
                        if (shape && shape._prevFill) {
                            shape.fill = shape._prevFill;
                        }
                    },
                    mouseDrop: (e, node) => {
                        const diagram = node.diagram;
                        const selnode = diagram.selection.first();
                        if (mayWorkFor(selnode, node)) {
                            const link = selnode.findTreeParentLink();
                            if (link !== null) {
                                link.fromNode = node;
                            } else {
                                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                            }
                        }
                    }
                },

                new go.Binding("text", "name"),
                new go.Binding("layerName", "isSelected", sel => sel ? "Foreground" : "").ofObject(),
                $(go.Panel, "Auto",
                    { name: "BODY" },
                    $(go.Shape, "Rectangle",
                        { name: "SHAPE", fill: "#333333", stroke: 'white', strokeWidth: 3.5, portId: "" }),
                    $(go.Panel, "Horizontal",
                        $(go.Picture,
                            {
                                name: "Picture",
                                desiredSize: new go.Size(70, 70),
                                margin: 1.5,
                                source: "images/HSnopic.png"
                            },
                            new go.Binding("source", "pic", findHeadShot)),

                        $(go.Panel, "Table",
                            {
                                minSize: new go.Size(130, NaN),
                                maxSize: new go.Size(150, NaN),
                                margin: new go.Margin(6, 10, 0, 6),
                                defaultAlignment: go.Spot.Left
                            },
                            $(go.RowColumnDefinition, { column: 2, width: 4 }),
                            $(go.TextBlock, textStyle(),  // the name
                                {
                                    name: "NAMETB",
                                    row: 0, column: 0, columnSpan: 5,
                                    font: "12pt Segoe UI,sans-serif",
                                    editable: true, isMultiline: false,
                                    minSize: new go.Size(50, 16)
                                },
                                new go.Binding("text", "name").makeTwoWay()),
                            $(go.TextBlock, "Title: ", textStyle(),
                                { row: 1, column: 0 }),
                            $(go.TextBlock, textStyle(),
                                {
                                    row: 1, column: 1, columnSpan: 4,
                                    editable: true, isMultiline: false,
                                    minSize: new go.Size(50, 14),
                                    margin: new go.Margin(0, 0, 0, 3)
                                },
                                new go.Binding("text", "title").makeTwoWay()),
                            $(go.TextBlock, textStyle(),
                                { row: 2, column: 0 },
                                new go.Binding("text", "key", v => "ID: " + v)),
                            $(go.TextBlock, textStyle(),
                                {
                                    row: 3, column: 0, columnSpan: 5,
                                    font: "italic 9pt sans-serif",
                                    wrap: go.TextBlock.WrapFit,
                                    editable: true,
                                    minSize: new go.Size(100, 14)
                                },
                                new go.Binding("text", "comments").makeTwoWay())
                        )
                    )
                ),
                $("Button",
                    $(go.Shape, "PlusLine", { width: 10, height: 10 }),
                    {
                        name: "BUTTON", alignment: go.Spot.Right, opacity: 0,
                        click: (e, button) => addEmployee(button.part)
                    },

                    new go.Binding("opacity", "isSelected", s => s ? 1 : 0).ofObject()
                ),
                new go.Binding("isTreeExpanded").makeTwoWay(),
                $("TreeExpanderButton",
                    {
                        name: "BUTTONX", alignment: go.Spot.Bottom, opacity: 0,
                        "_treeExpandedFigure": "TriangleUp",
                        "_treeCollapsedFigure": "TriangleDown"
                    },
                    new go.Binding("opacity", "isSelected", s => s ? 1 : 0).ofObject()
                )
            );



        function addEmployee(node) {
            if (!node) return;
            const thisemp = node.data;
            myDiagram.startTransaction("add employee");
            const newemp = { name: "(new person)", title: "(title)", comments: "", parent: thisemp.key };
            myDiagram.model.addNodeData(newemp);
            const newnode = myDiagram.findNodeForData(newemp);
            if (newnode) newnode.location = node.location;
            myDiagram.commitTransaction("add employee");
            myDiagram.commandHandler.scrollToPart(newnode);
        }


        myDiagram.nodeTemplate.contextMenu =
            $("ContextMenu",
                $("ContextMenuButton",
                    $(go.TextBlock, "Add Employee"),
                    {
                        click: (e, button) => addEmployee(button.part.adornedPart)
                    }
                ),
                $("ContextMenuButton",
                    $(go.TextBlock, "Vacate Position"),
                    {
                        click: (e, button) => {
                            const node = button.part.adornedPart;
                            if (node !== null) {
                                const thisemp = node.data;
                                myDiagram.startTransaction("vacate");
                                myDiagram.model.setDataProperty(thisemp, "name", "(Vacant)");
                                myDiagram.model.setDataProperty(thisemp, "pic", "");
                                myDiagram.model.setDataProperty(thisemp, "comments", "");
                                myDiagram.commitTransaction("vacate");
                            }
                        }
                    }
                ),
                $("ContextMenuButton",
                    $(go.TextBlock, "Remove Role"),
                    {
                        click: (e, button) => {
                            const node = button.part.adornedPart;
                            if (node !== null) {
                                myDiagram.startTransaction("reparent remove");
                                const chl = node.findTreeChildrenNodes();
                                while (chl.next()) {
                                    const emp = chl.value;
                                    myDiagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key);
                                }
                                myDiagram.model.removeNodeData(node.data);
                                myDiagram.commitTransaction("reparent remove");
                            }
                        }
                    }
                ),
                $("ContextMenuButton",
                    $(go.TextBlock, "Remove Department"),
                    {
                        click: (e, button) => {
                            const node = button.part.adornedPart;
                            if (node !== null) {
                                myDiagram.startTransaction("remove dept");
                                myDiagram.removeParts(node.findTreeParts());
                                myDiagram.commitTransaction("remove dept");
                            }
                        }
                    }
                )
            );


        myDiagram.linkTemplate =
            $(go.Link, go.Link.Orthogonal,
                { layerName: "Background", corner: 5 },
                $(go.Shape, { strokeWidth: 1.5, stroke: "#F5F5F5" }));


        let myPalette = $(go.Palette, "myPaletteDiv");
        myPalette.nodeTemplate =
            $(go.Node, "Auto",
                $(go.Shape, "Rectangle",
                    { fill: "white", stroke: null },
                    new go.Binding("fill", "color")),
                $(go.TextBlock,
                    { margin: 8 },
                    new go.Binding("text", "key"))
            );

        myPalette.model = new go.GraphLinksModel([
            { key: "Alpha", color: "lightblue" },
            { key: "Beta", color: "orange" },
            // ...other nodes...
        ]);

    }, []);


    return (
        <div>
            <div id="myDiagramDiv" style={{ width: "100%", height: "600px" }}></div>
        </div>

    );
};

export default Landing;