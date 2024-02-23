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
                    Reporting: ""
                },
                layout:
                    $(go.TreeLayout,
                        {
                            treeStyle: go.TreeLayout.StyleLastParents,
                            arrangement: go.TreeLayout.ArrangementHorizontal,
                            angle: 90,
                            layerSpacing: 35,
                            alternateAngle: 90,
                            alternateLayerSpacing: 35,
                            alternateAlignment: go.TreeLayout.AlignmentBus,
                            alternateNodeSpacing: 20
                        }),
            });

        function mayWorkFor(node1, node2) {
            if (!(node1 instanceof go.Node)) return false;
            if (node1 === node2) return false;
            if (node2.isInTreeOf(node1)) return false;
            return true;
        }

        function textStyle() {
            return { font: "10pt  Segoe UI,sans-serif", stroke: "black" , textAlign: "center",margin: 5
        };
        }


        let model = $(go.TreeModel);
        fetch('api/employees')
            .then(response => response.json())
            .then(data => {
                model.nodeDataArray = data;
            })
            .catch(error => console.error('Error:', error));

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
                        { name: "SHAPE", fill: "white", stroke: 'white', strokeWidth: 3.5, portId: "" }),
                    $(go.Panel, "Horizontal",


                        $(go.Panel, "Table",
                            {
                                minSize: new go.Size(180, NaN),
                                maxSize: new go.Size(180, NaN),
                                margin: new go.Margin(0, 10, 0, 0),
                                defaultAlignment: go.Spot.Left
                            },
                            $(go.RowColumnDefinition, { column: 2, width: 6 }),

                            $(go.TextBlock, textStyle(),
                                new go.Binding("text", "name").makeTwoWay(),
                                {font: "bold 12pt Segoe UI,sans-serif"}
                            ),

                            $(go.TextBlock, textStyle(),
                                new go.Binding("text", "key").makeTwoWay(),
                                { row: 0, column: 1 }
                            ),



                            $(go.TextBlock, textStyle(),
                                new go.Binding("text", "designation").makeTwoWay(),
                                { row: 1, column: 0 }
                            ),

                            $(go.TextBlock, textStyle(),
                                new go.Binding("text", "team").makeTwoWay(),
                                { row: 2, column: 0 }
                            ),

                            $(go.TextBlock, "Reporting to: ", textStyle(),
                                {row: 3, column: 0 }
                            ),

                            $(go.TextBlock, textStyle(),
                                new go.Binding("text", "parent").makeTwoWay(),
                                { row: 3, column: 1 }
                            ),       

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
            const newemp = { name: "(new person)", title: "(title)", comments: "", parent: thisemp.id };
            myDiagram.model.addNodeData(newemp);
            const newnode = myDiagram.findNodeForData(newemp);
            if (newnode) newnode.location = node.location;
            myDiagram.commitTransaction("add employee");
            myDiagram.commandHandler.scrollToPart(newnode);
        }

        myDiagram.linkTemplate =
            $(go.Link, go.Link.Orthogonal,
                { layerName: "Background", corner: 5 },
                $(go.Shape, { strokeWidth: 1.5, stroke: "#F5F5F5" }));

    }, []);


    return (
            // <div id="myDiagramDiv" style={{ width: "100%", height: "600px" }}></div>
            <></>
            
    );
};

export default Landing;