/**
 * Figma数据转换器测试程序
 * 用于测试Figma原始数据到标准Schema的转换
 */

// 内置测试数据 - 可以直接使用此数据进行测试
const testData = {
  "thumbnailUrl": "",
  "nodes": [
    {
      "id": "2:18",
      "name": "椭圆形",
      "type": "GROUP",
      "boundingBox": {
        "x": 0,
        "y": 0,
        "width": 750,
        "height": 1971
      },
      "fills": "fill_rabbbii",
      "children": [
        {
          "id": "2:19",
          "name": "蒙版",
          "type": "IMAGE-SVG",
          "boundingBox": {
            "x": 0,
            "y": 0,
            "width": 750,
            "height": 1971
          },
          "fills": "fill_wcthdeb"
        },
        {
          "id": "2:20",
          "name": "蒙版",
          "type": "IMAGE-SVG",
          "boundingBox": {
            "x": 0,
            "y": 0,
            "width": 750,
            "height": 1971
          },
          "fills": "fill_wcthdeb"
        }
      ]
    },
    {
      "id": "2:21",
      "name": "Group",
      "type": "GROUP",
      "boundingBox": {
        "x": 0,
        "y": 0,
        "width": 750,
        "height": 88
      },
      "fills": "fill_rabbbii",
      "children": [
        {
          "id": "2:22",
          "name": "Group 4",
          "type": "GROUP",
          "boundingBox": {
            "x": 0,
            "y": 0,
            "width": 750,
            "height": 88
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:23",
              "name": "Battery@iPhone X-H5",
              "type": "GROUP",
              "boundingBox": {
                "x": 0,
                "y": 0,
                "width": 750,
                "height": 88
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:24",
                  "name": "Battery@iPhone X",
                  "type": "INSTANCE",
                  "boundingBox": {
                    "x": 0,
                    "y": 0,
                    "width": 750,
                    "height": 88
                  },
                  "children": [
                    {
                      "id": "I2:24;0:7748",
                      "name": "Battery",
                      "type": "GROUP",
                      "boundingBox": {
                        "x": 670,
                        "y": 34.6944580078125,
                        "width": 50.60234451293945,
                        "height": 23.61111068725586
                      },
                      "fills": "fill_rabbbii",
                      "borderRadius": "0px 0px 0px 0px",
                      "children": [
                        {
                          "id": "I2:24;0:7749",
                          "name": "Border",
                          "type": "RECTANGLE",
                          "boundingBox": {
                            "x": 670,
                            "y": 34.69444274902344,
                            "width": 45.7599983215332,
                            "height": 23.61111068725586
                          },
                          "opacity": 0.3499999940395355,
                          "borderRadius": "2.6666667461395264px"
                        },
                        {
                          "id": "I2:24;0:7750",
                          "name": "Cap",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 717.8400268554688,
                            "y": 42.33333206176758,
                            "width": 2.7623190879821777,
                            "height": 8.333333015441895
                          },
                          "fills": "fill_rabbbii",
                          "opacity": 0.4000000059604645
                        },
                        {
                          "id": "I2:24;0:7751",
                          "name": "Capacity",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 674.1599731445312,
                            "y": 38.86111068725586,
                            "width": 37.439998626708984,
                            "height": 15.277777671813965
                          },
                          "fills": "fill_rabbbii",
                          "borderRadius": "1.3333333730697632px"
                        }
                      ]
                    },
                    {
                      "id": "I2:24;0:7754",
                      "name": "Wifi",
                      "type": "BOOLEAN_OPERATION",
                      "boundingBox": {
                        "x": 628,
                        "y": 35,
                        "width": 31,
                        "height": 23
                      },
                      "fills": "fill_rabbbii",
                      "children": [
                        {
                          "id": "I2:24;0:7752",
                          "name": "Wifi-path",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 628,
                            "y": 35,
                            "width": 31,
                            "height": 9.948816299438477
                          },
                          "fills": "fill_ibx9yk8"
                        },
                        {
                          "id": "I2:24;0:7753",
                          "name": "Wifi-path",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 633.4059448242188,
                            "y": 42.95790100097656,
                            "width": 20.19458770751953,
                            "height": 7.622179985046387
                          },
                          "fills": "fill_ibx9yk8"
                        },
                        {
                          "id": "I2:24;0:7755",
                          "name": "Wifi-path",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 638.805419921875,
                            "y": 50.92226791381836,
                            "width": 9.390490531921387,
                            "height": 7.077731132507324
                          },
                          "fills": "fill_ibx9yk8"
                        }
                      ]
                    },
                    {
                      "id": "I2:24;0:7758",
                      "name": "Cellular Connection",
                      "type": "BOOLEAN_OPERATION",
                      "boundingBox": {
                        "x": 583,
                        "y": 35,
                        "width": 35,
                        "height": 23
                      },
                      "fills": "fill_rabbbii",
                      "children": [
                        {
                          "id": "I2:24;0:7756",
                          "name": "Cellular_Connection-path",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 583,
                            "y": 49.375,
                            "width": 6.176470756530762,
                            "height": 8.625
                          },
                          "fills": "fill_ibx9yk8"
                        },
                        {
                          "id": "I2:24;0:7757",
                          "name": "Cellular_Connection-path",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 592.6078491210938,
                            "y": 45.0625,
                            "width": 6.176470756530762,
                            "height": 12.9375
                          },
                          "fills": "fill_ibx9yk8"
                        },
                        {
                          "id": "I2:24;0:7759",
                          "name": "Cellular_Connection-path",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 602.2156982421875,
                            "y": 40.03125,
                            "width": 6.176470756530762,
                            "height": 17.96875
                          },
                          "fills": "fill_ibx9yk8"
                        },
                        {
                          "id": "I2:24;0:7760",
                          "name": "Cellular_Connection-path",
                          "type": "IMAGE-SVG",
                          "boundingBox": {
                            "x": 611.8235473632812,
                            "y": 35,
                            "width": 6.176470756530762,
                            "height": 23
                          },
                          "fills": "fill_ibx9yk8"
                        }
                      ]
                    },
                    {
                      "id": "I2:24;0:7761",
                      "name": "9：41",
                      "type": "TEXT",
                      "boundingBox": {
                        "x": 60,
                        "y": 26,
                        "width": 73,
                        "height": 39
                      },
                      "textStyle": "style_otl9ybv",
                      "fills": "fill_rabbbii",
                      "text": "9：41"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "2:25",
      "name": "编组 24备份",
      "type": "FRAME",
      "boundingBox": {
        "x": 24,
        "y": 721,
        "width": 702,
        "height": 346
      },
      "fills": "fill_rabbbii",
      "children": [
        {
          "id": "2:26",
          "name": "编组 4",
          "type": "FRAME",
          "boundingBox": {
            "x": 24,
            "y": 721,
            "width": 702,
            "height": 346
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:27",
              "name": "Rectangle",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 24,
                "y": 769,
                "width": 702,
                "height": 298
              },
              "fills": "fill_z3sdo9u",
              "borderRadius": "24px"
            },
            {
              "id": "2:28",
              "name": "编组 2",
              "type": "FRAME",
              "boundingBox": {
                "x": 27,
                "y": 721,
                "width": 281,
                "height": 124
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:29",
                  "name": "2022年11月11日 18:24",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 27,
                    "y": 721,
                    "width": 275,
                    "height": 32
                  },
                  "textStyle": "style_6kbq4hv",
                  "fills": "fill_rabbbii",
                  "text": "2022年11月11日 18:24"
                },
                {
                  "id": "2:30",
                  "name": "🐷🐷玉的努力",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 140,
                    "y": 809,
                    "width": 168,
                    "height": 36
                  },
                  "textStyle": "style_zzt9yiw",
                  "fills": "fill_rabbbii",
                  "text": "🐷🐷玉的努力"
                }
              ]
            },
            {
              "id": "2:31",
              "name": "头像",
              "type": "GROUP",
              "boundingBox": {
                "x": 56,
                "y": 805,
                "width": 72,
                "height": 72
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:32",
                  "name": "Oval",
                  "type": "ELLIPSE",
                  "boundingBox": {
                    "x": 56,
                    "y": 805,
                    "width": 72,
                    "height": 72
                  },
                  "fills": "fill_yccq8q4"
                },
                {
                  "id": "2:33",
                  "name": "Oval",
                  "type": "ELLIPSE",
                  "boundingBox": {
                    "x": 56,
                    "y": 805,
                    "width": 72,
                    "height": 72
                  },
                  "fills": "fill_yccq8q4"
                }
              ]
            },
            {
              "id": "2:34",
              "name": "手动录入",
              "type": "TEXT",
              "boundingBox": {
                "x": 598,
                "y": 805,
                "width": 96,
                "height": 34
              },
              "textStyle": "style_qo1k2c7",
              "fills": "fill_auytahi",
              "text": "手动录入"
            },
            {
              "id": "2:35",
              "name": "编组 7备份 5",
              "type": "FRAME",
              "boundingBox": {
                "x": 67,
                "y": 921,
                "width": 89,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:36",
                  "name": "体重",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 87,
                    "y": 995,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "体重",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:37",
                  "name": "84",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 67,
                    "y": 921,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "84",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:38",
                  "name": "kg",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 129,
                    "y": 947,
                    "width": 27,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "kg",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:39",
              "name": "编组 7备份 6",
              "type": "FRAME",
              "boundingBox": {
                "x": 244,
                "y": 921,
                "width": 86,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:40",
                  "name": "体脂率",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 251,
                    "y": 995,
                    "width": 72,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "体脂率",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:41",
                  "name": "24",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 244,
                    "y": 921,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "24",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:42",
                  "name": "%",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 306,
                    "y": 947,
                    "width": 24,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "%",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:43",
              "name": "编组 7备份 9",
              "type": "FRAME",
              "boundingBox": {
                "x": 423,
                "y": 921,
                "width": 89,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:44",
                  "name": "骨骼肌",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 430,
                    "y": 995,
                    "width": 72,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "骨骼肌",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:45",
                  "name": "24",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 423,
                    "y": 921,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "24",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:46",
                  "name": "kg",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 485,
                    "y": 947,
                    "width": 27,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "kg",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:47",
              "name": "直线 2",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 199,
                "y": 957,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            },
            {
              "id": "2:48",
              "name": "直线 2备份 3",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 374,
                "y": 957,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            }
          ]
        },
        {
          "id": "2:49",
          "name": "24岁",
          "type": "TEXT",
          "boundingBox": {
            "x": 144,
            "y": 847,
            "width": 53,
            "height": 36
          },
          "textStyle": "style_b22uged",
          "fills": "fill_rabbbii",
          "text": "24岁"
        }
      ]
    },
    {
      "id": "2:50",
      "name": "编组 24备份 2",
      "type": "FRAME",
      "boundingBox": {
        "x": 24,
        "y": 1115,
        "width": 702,
        "height": 496
      },
      "fills": "fill_rabbbii",
      "children": [
        {
          "id": "2:51",
          "name": "编组 4",
          "type": "FRAME",
          "boundingBox": {
            "x": 24,
            "y": 1115,
            "width": 702,
            "height": 496
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:52",
              "name": "Rectangle",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 24,
                "y": 1163,
                "width": 702,
                "height": 448
              },
              "fills": "fill_z3sdo9u",
              "borderRadius": "24px"
            },
            {
              "id": "2:53",
              "name": "编组 2",
              "type": "FRAME",
              "boundingBox": {
                "x": 27,
                "y": 1115,
                "width": 451,
                "height": 124
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:54",
                  "name": "2022年11月11日 18:24",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 27,
                    "y": 1115,
                    "width": 275,
                    "height": 32
                  },
                  "textStyle": "style_6kbq4hv",
                  "fills": "fill_rabbbii",
                  "text": "2022年11月11日 18:24"
                },
                {
                  "id": "2:55",
                  "name": "远洋乐堤港精品店备份",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 318,
                    "y": 1117,
                    "width": 160,
                    "height": 28
                  },
                  "textStyle": "style_e03sc44",
                  "fills": "fill_rabbbii",
                  "text": "远洋乐堤港精品店",
                  "opacity": 0.6000000238418579
                },
                {
                  "id": "2:56",
                  "name": "🐷🐷玉的努力",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 140,
                    "y": 1203,
                    "width": 168,
                    "height": 36
                  },
                  "textStyle": "style_zzt9yiw",
                  "fills": "fill_rabbbii",
                  "text": "🐷🐷玉的努力"
                }
              ]
            },
            {
              "id": "2:57",
              "name": "头像",
              "type": "GROUP",
              "boundingBox": {
                "x": 56,
                "y": 1199,
                "width": 72,
                "height": 72
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:58",
                  "name": "Oval",
                  "type": "ELLIPSE",
                  "boundingBox": {
                    "x": 56,
                    "y": 1199,
                    "width": 72,
                    "height": 72
                  },
                  "fills": "fill_yccq8q4"
                },
                {
                  "id": "2:59",
                  "name": "Oval",
                  "type": "ELLIPSE",
                  "boundingBox": {
                    "x": 56,
                    "y": 1199,
                    "width": 72,
                    "height": 72
                  },
                  "fills": "fill_yccq8q4"
                }
              ]
            },
            {
              "id": "2:60",
              "name": "健美型",
              "type": "TEXT",
              "boundingBox": {
                "x": 56,
                "y": 1355,
                "width": 168,
                "height": 84
              },
              "textStyle": "style_n9py85y",
              "fills": "fill_8rawg7c",
              "text": "健美型"
            },
            {
              "id": "2:61",
              "name": "体型",
              "type": "TEXT",
              "boundingBox": {
                "x": 56,
                "y": 1315,
                "width": 48,
                "height": 32
              },
              "textStyle": "style_u6eeery",
              "fills": "fill_rabbbii",
              "text": "体型",
              "opacity": 0.800000011920929
            }
          ]
        },
        {
          "id": "2:62",
          "name": "24岁",
          "type": "TEXT",
          "boundingBox": {
            "x": 144,
            "y": 1241,
            "width": 53,
            "height": 36
          },
          "textStyle": "style_b22uged",
          "fills": "fill_rabbbii",
          "text": "24岁"
        },
        {
          "id": "2:63",
          "name": "编组 8",
          "type": "FRAME",
          "boundingBox": {
            "x": 542,
            "y": 1203,
            "width": 160,
            "height": 56
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:64",
              "name": "矩形",
              "type": "RECTANGLE",
              "boundingBox": {
                "x": 542,
                "y": 1203,
                "width": 160,
                "height": 56
              },
              "fills": "fill_rabbbii",
              "borderRadius": "28px"
            },
            {
              "id": "2:65",
              "name": "查看完整报告",
              "type": "TEXT",
              "boundingBox": {
                "x": 562,
                "y": 1217,
                "width": 120,
                "height": 28
              },
              "textStyle": "style_z5f0pjq",
              "fills": "fill_thomaj5",
              "text": "查看完整报告"
            }
          ]
        },
        {
          "id": "2:66",
          "name": "编组 7",
          "type": "GROUP",
          "boundingBox": {
            "x": 58,
            "y": 1464,
            "width": 628,
            "height": 106
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:67",
              "name": "编组 7备份 5",
              "type": "FRAME",
              "boundingBox": {
                "x": 58,
                "y": 1464,
                "width": 104,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:68",
                  "name": "体重",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 58,
                    "y": 1538,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "体重",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:69",
                  "name": "偏高",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 114,
                    "y": 1538,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_myadpuo",
                  "text": "偏高"
                },
                {
                  "id": "2:70",
                  "name": "84",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 67,
                    "y": 1464,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "84",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:71",
                  "name": "kg",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 129,
                    "y": 1490,
                    "width": 27,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "kg",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:72",
              "name": "编组 7备份 6",
              "type": "FRAME",
              "boundingBox": {
                "x": 221,
                "y": 1464,
                "width": 127,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:73",
                  "name": "体脂率",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 221,
                    "y": 1538,
                    "width": 72,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "体脂率",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:74",
                  "name": "偏高备份",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 300,
                    "y": 1538,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_myadpuo",
                  "text": "偏高"
                },
                {
                  "id": "2:75",
                  "name": "24",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 244,
                    "y": 1464,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "24",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:76",
                  "name": "%",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 306,
                    "y": 1490,
                    "width": 24,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "%",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:77",
              "name": "编组 7备份 7",
              "type": "FRAME",
              "boundingBox": {
                "x": 398,
                "y": 1464,
                "width": 128,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:78",
                  "name": "骨骼肌",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 398,
                    "y": 1538,
                    "width": 72,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "骨骼肌",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:79",
                  "name": "偏低",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 478,
                    "y": 1538,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_ssigncy",
                  "text": "偏低"
                },
                {
                  "id": "2:80",
                  "name": "28",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 417,
                    "y": 1464,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "28",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:81",
                  "name": "kg",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 479,
                    "y": 1490,
                    "width": 27,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "kg",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:82",
              "name": "编组 7备份 8",
              "type": "FRAME",
              "boundingBox": {
                "x": 590,
                "y": 1464,
                "width": 96,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:83",
                  "name": "身体年龄",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 590,
                    "y": 1538,
                    "width": 96,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "身体年龄",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:84",
                  "name": "34",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 595,
                    "y": 1464,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "34",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:85",
                  "name": "岁",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 657,
                    "y": 1490,
                    "width": 24,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "岁",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:86",
              "name": "直线 2",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 199,
                "y": 1500,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            },
            {
              "id": "2:87",
              "name": "直线 2备份",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 374,
                "y": 1500,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            },
            {
              "id": "2:88",
              "name": "直线 2备份 2",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 549,
                "y": 1500,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            }
          ]
        }
      ]
    },
    {
      "id": "2:89",
      "name": "编组 24备份 3",
      "type": "FRAME",
      "boundingBox": {
        "x": 24,
        "y": 185,
        "width": 702,
        "height": 488
      },
      "fills": "fill_rabbbii",
      "children": [
        {
          "id": "2:90",
          "name": "编组 4",
          "type": "FRAME",
          "boundingBox": {
            "x": 24,
            "y": 233,
            "width": 702,
            "height": 440
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:91",
              "name": "Rectangle",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 24,
                "y": 233,
                "width": 702,
                "height": 440
              },
              "fills": "fill_z3sdo9u",
              "borderRadius": "24px"
            },
            {
              "id": "2:92",
              "name": "编组 2",
              "type": "FRAME",
              "boundingBox": {
                "x": 140,
                "y": 271,
                "width": 168,
                "height": 36
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:93",
                  "name": "🐷🐷玉的努力",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 140,
                    "y": 271,
                    "width": 168,
                    "height": 36
                  },
                  "textStyle": "style_zzt9yiw",
                  "fills": "fill_rabbbii",
                  "text": "🐷🐷玉的努力"
                }
              ]
            },
            {
              "id": "2:94",
              "name": "头像",
              "type": "GROUP",
              "boundingBox": {
                "x": 56,
                "y": 269,
                "width": 72,
                "height": 72
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:95",
                  "name": "Oval",
                  "type": "ELLIPSE",
                  "boundingBox": {
                    "x": 56,
                    "y": 269,
                    "width": 72,
                    "height": 72
                  },
                  "fills": "fill_yccq8q4"
                },
                {
                  "id": "2:96",
                  "name": "Oval",
                  "type": "ELLIPSE",
                  "boundingBox": {
                    "x": 56,
                    "y": 269,
                    "width": 72,
                    "height": 72
                  },
                  "fills": "fill_yccq8q4"
                }
              ]
            },
            {
              "id": "2:97",
              "name": "运动型",
              "type": "TEXT",
              "boundingBox": {
                "x": 56,
                "y": 425,
                "width": 168,
                "height": 84
              },
              "textStyle": "style_n9py85y",
              "fills": "fill_fez2f88",
              "text": "运动型"
            },
            {
              "id": "2:98",
              "name": "体型",
              "type": "TEXT",
              "boundingBox": {
                "x": 56,
                "y": 385,
                "width": 48,
                "height": 32
              },
              "textStyle": "style_u6eeery",
              "fills": "fill_rabbbii",
              "text": "体型",
              "opacity": 0.800000011920929
            }
          ]
        },
        {
          "id": "2:99",
          "name": "2022年11月11日 18:24",
          "type": "TEXT",
          "boundingBox": {
            "x": 27,
            "y": 185,
            "width": 275,
            "height": 32
          },
          "textStyle": "style_6kbq4hv",
          "fills": "fill_rabbbii",
          "text": "2022年11月11日 18:24"
        },
        {
          "id": "2:100",
          "name": "远洋乐堤港精品店",
          "type": "TEXT",
          "boundingBox": {
            "x": 318,
            "y": 187,
            "width": 160,
            "height": 28
          },
          "textStyle": "style_e03sc44",
          "fills": "fill_rabbbii",
          "text": "远洋乐堤港精品店",
          "opacity": 0.6000000238418579
        },
        {
          "id": "2:101",
          "name": "24岁",
          "type": "TEXT",
          "boundingBox": {
            "x": 144,
            "y": 311,
            "width": 53,
            "height": 36
          },
          "textStyle": "style_b22uged",
          "fills": "fill_rabbbii",
          "text": "24岁"
        },
        {
          "id": "2:102",
          "name": "编组 8",
          "type": "FRAME",
          "boundingBox": {
            "x": 542,
            "y": 273,
            "width": 160,
            "height": 56
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:103",
              "name": "矩形",
              "type": "RECTANGLE",
              "boundingBox": {
                "x": 542,
                "y": 273,
                "width": 160,
                "height": 56
              },
              "fills": "fill_rabbbii",
              "borderRadius": "28px"
            },
            {
              "id": "2:104",
              "name": "查看完整报告",
              "type": "TEXT",
              "boundingBox": {
                "x": 562,
                "y": 287,
                "width": 120,
                "height": 28
              },
              "textStyle": "style_z5f0pjq",
              "fills": "fill_thomaj5",
              "text": "查看完整报告"
            }
          ]
        },
        {
          "id": "2:105",
          "name": "编组 7",
          "type": "GROUP",
          "boundingBox": {
            "x": 58,
            "y": 534,
            "width": 628,
            "height": 106
          },
          "fills": "fill_rabbbii",
          "children": [
            {
              "id": "2:106",
              "name": "编组 7备份 5",
              "type": "FRAME",
              "boundingBox": {
                "x": 58,
                "y": 534,
                "width": 104,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:107",
                  "name": "体重",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 58,
                    "y": 608,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "体重",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:108",
                  "name": "偏高",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 114,
                    "y": 608,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_myadpuo",
                  "text": "偏高"
                },
                {
                  "id": "2:109",
                  "name": "84",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 67,
                    "y": 534,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "84",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:110",
                  "name": "kg",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 129,
                    "y": 560,
                    "width": 27,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "kg",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:111",
              "name": "编组 7备份 6",
              "type": "FRAME",
              "boundingBox": {
                "x": 221,
                "y": 534,
                "width": 127,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:112",
                  "name": "体脂率",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 221,
                    "y": 608,
                    "width": 72,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "体脂率",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:113",
                  "name": "偏高备份",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 300,
                    "y": 608,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_myadpuo",
                  "text": "偏高"
                },
                {
                  "id": "2:114",
                  "name": "24",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 244,
                    "y": 534,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "24",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:115",
                  "name": "%",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 306,
                    "y": 560,
                    "width": 24,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "%",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:116",
              "name": "编组 7备份 7",
              "type": "FRAME",
              "boundingBox": {
                "x": 398,
                "y": 534,
                "width": 128,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:117",
                  "name": "骨骼肌",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 398,
                    "y": 608,
                    "width": 72,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "骨骼肌",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:118",
                  "name": "偏低",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 478,
                    "y": 608,
                    "width": 48,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_ssigncy",
                  "text": "偏低"
                },
                {
                  "id": "2:119",
                  "name": "28",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 417,
                    "y": 534,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "28",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:120",
                  "name": "kg",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 479,
                    "y": 560,
                    "width": 27,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "kg",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:121",
              "name": "编组 7备份 8",
              "type": "FRAME",
              "boundingBox": {
                "x": 590,
                "y": 534,
                "width": 96,
                "height": 106
              },
              "fills": "fill_rabbbii",
              "children": [
                {
                  "id": "2:122",
                  "name": "身体年龄",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 590,
                    "y": 608,
                    "width": 96,
                    "height": 32
                  },
                  "textStyle": "style_p9bftt1",
                  "fills": "fill_rabbbii",
                  "text": "身体年龄",
                  "opacity": 0.800000011920929
                },
                {
                  "id": "2:123",
                  "name": "34",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 595,
                    "y": 534,
                    "width": 54,
                    "height": 65
                  },
                  "textStyle": "style_nh9omf0",
                  "fills": "fill_rabbbii",
                  "text": "34",
                  "opacity": 0.8999999761581421
                },
                {
                  "id": "2:124",
                  "name": "岁",
                  "type": "TEXT",
                  "boundingBox": {
                    "x": 657,
                    "y": 560,
                    "width": 24,
                    "height": 34
                  },
                  "textStyle": "style_w2vopjw",
                  "fills": "fill_rabbbii",
                  "text": "岁",
                  "opacity": 0.8999999761581421
                }
              ]
            },
            {
              "id": "2:125",
              "name": "直线 2",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 199,
                "y": 570,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            },
            {
              "id": "2:126",
              "name": "直线 2备份",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 374,
                "y": 570,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            },
            {
              "id": "2:127",
              "name": "直线 2备份 2",
              "type": "IMAGE-SVG",
              "boundingBox": {
                "x": 549,
                "y": 570,
                "width": 1,
                "height": 34
              },
              "fills": "fill_gny6lr2",
              "opacity": 0.20000000298023224
            }
          ]
        }
      ]
    },
    {
      "id": "2:128",
      "name": "报告列表",
      "type": "TEXT",
      "boundingBox": {
        "x": 311,
        "y": 106,
        "width": 128,
        "height": 45
      },
      "textStyle": "style_kkqjea7",
      "fills": "fill_rabbbii",
      "text": "报告列表"
    },
    {
      "id": "2:129",
      "name": "编辑",
      "type": "TEXT",
      "boundingBox": {
        "x": 660,
        "y": 106,
        "width": 56,
        "height": 39
      },
      "textStyle": "style_eak19g8",
      "fills": "fill_rabbbii",
      "text": "编辑"
    },
    {
      "id": "2:130",
      "name": "分四个模块 剧中展示",
      "type": "TEXT",
      "boundingBox": {
        "x": -202,
        "y": 734,
        "width": 140,
        "height": 78
      },
      "textStyle": "style_nr84kyd",
      "fills": "fill_8auv8o2",
      "text": "分四个模块\n剧中展示"
    }
  ],
  "globalVars": {
    "styles": {
      "fill_rabbbii": [
        {
          "type": "SOLID",
          "hex": "#ffffff",
          "rgba": "rgba(255, 255, 255, 1)",
          "opacity": 1
        }
      ],
      "fill_wcthdeb": [
        {
          "type": "SOLID",
          "hex": "#1c1d22",
          "rgba": "rgba(28, 29, 34, 1)",
          "opacity": 1
        }
      ],
      "fill_ibx9yk8": [
        {
          "type": "SOLID",
          "hex": "#000000",
          "rgba": "rgba(0, 0, 0, 1)",
          "opacity": 1
        }
      ],
      "style_otl9ybv": {
        "fontFamily": "PingFang SC",
        "fontWeight": 600,
        "fontSize": 28,
        "lineHeight": "1.4000000272478377em",
        "letterSpacing": "-1.0000000042574746%",
        "textAlignHorizontal": "CENTER",
        "textAlignVertical": "TOP"
      },
      "fill_z3sdo9u": [
        {
          "type": "SOLID",
          "hex": "#ffffff",
          "rgba": "rgba(255, 255, 255, 0.07999999821186066)",
          "opacity": 0.07999999821186066
        }
      ],
      "style_6kbq4hv": {
        "fontFamily": "PingFang SC",
        "fontWeight": 400,
        "fontSize": 28,
        "lineHeight": "1.1428571428571428em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_zzt9yiw": {
        "fontFamily": "Roboto",
        "fontWeight": 400,
        "fontSize": 28,
        "lineHeight": "1.2857142857142858em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "fill_yccq8q4": [
        {}
      ],
      "style_qo1k2c7": {
        "fontFamily": "PingFang SC",
        "fontWeight": 500,
        "fontSize": 24,
        "lineHeight": "1.3999999364217122em",
        "textAlignHorizontal": "CENTER",
        "textAlignVertical": "TOP"
      },
      "fill_auytahi": [
        {
          "type": "SOLID",
          "hex": "#8a8697",
          "rgba": "rgba(138, 134, 151, 1)",
          "opacity": 1
        }
      ],
      "style_p9bftt1": {
        "fontFamily": "PingFang SC",
        "fontWeight": 400,
        "fontSize": 24,
        "lineHeight": "1.3333333333333333em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_nh9omf0": {
        "fontFamily": "DIN Alternate",
        "fontWeight": 700,
        "fontSize": 56,
        "lineHeight": "1.1640625em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_w2vopjw": {
        "fontFamily": "PingFang SC",
        "fontWeight": 400,
        "fontSize": 24,
        "lineHeight": "1.3999999364217122em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "fill_gny6lr2": [
        {
          "type": "SOLID",
          "hex": "#d8d8d8",
          "rgba": "rgba(216, 216, 216, 1)",
          "opacity": 1
        }
      ],
      "style_b22uged": {
        "fontFamily": "PingFang SC",
        "fontWeight": 400,
        "fontSize": 24,
        "lineHeight": "1.5em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_e03sc44": {
        "fontFamily": "PingFang SC",
        "fontWeight": 300,
        "fontSize": 20,
        "lineHeight": "1.4em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_n9py85y": {
        "fontFamily": "PingFang SC",
        "fontWeight": 600,
        "fontSize": 56,
        "lineHeight": "1.5em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "fill_8rawg7c": [
        {
          "type": "SOLID",
          "hex": "#3e46ff",
          "rgba": "rgba(62, 70, 255, 1)",
          "opacity": 1
        }
      ],
      "style_u6eeery": {
        "fontFamily": "PingFang SC",
        "fontWeight": 500,
        "fontSize": 24,
        "lineHeight": "1.3333333333333333em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_z5f0pjq": {
        "fontFamily": "PingFang SC",
        "fontWeight": 600,
        "fontSize": 20,
        "lineHeight": "1.4em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "fill_thomaj5": [
        {
          "type": "SOLID",
          "hex": "#2a2a2d",
          "rgba": "rgba(42, 42, 45, 1)",
          "opacity": 1
        }
      ],
      "fill_myadpuo": [
        {
          "type": "SOLID",
          "hex": "#ff5a20",
          "rgba": "rgba(255, 90, 32, 1)",
          "opacity": 1
        }
      ],
      "fill_ssigncy": [
        {
          "type": "SOLID",
          "hex": "#e9ad45",
          "rgba": "rgba(233, 173, 69, 1)",
          "opacity": 1
        }
      ],
      "fill_fez2f88": [
        {
          "type": "SOLID",
          "hex": "#4e84ff",
          "rgba": "rgba(78, 132, 255, 1)",
          "opacity": 1
        }
      ],
      "style_kkqjea7": {
        "fontFamily": "PingFang SC",
        "fontWeight": 600,
        "fontSize": 32,
        "lineHeight": "1.399999976158142em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_eak19g8": {
        "fontFamily": "PingFang SC",
        "fontWeight": 400,
        "fontSize": 28,
        "lineHeight": "1.4000000272478377em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "style_nr84kyd": {
        "fontFamily": "PingFang SC",
        "fontWeight": 600,
        "fontSize": 28,
        "lineHeight": "1.4000000272478377em",
        "textAlignHorizontal": "LEFT",
        "textAlignVertical": "TOP"
      },
      "fill_8auv8o2": [
        {
          "type": "SOLID",
          "hex": "#9e4bff",
          "rgba": "rgba(158, 75, 255, 1)",
          "opacity": 1
        }
      ]
    }
  }
}

const { transformFigmaJsonToSchema, generateSchemaDiagnostics } = require('./figma-schema-transformer');

/**
 * 主测试函数
 * @param figmaJsonPath Figma数据JSON文件路径
 */
async function testFigmaTransformer(figmaJsonPath) {
  try {
    // 导入node环境的fs模块
    const fs = require('fs');
    const path = require('path');

    console.log(`开始读取Figma数据文件: ${figmaJsonPath}`);

    // 读取Figma JSON数据
    const figmaJsonData = fs.readFileSync(figmaJsonPath, 'utf8');
    console.log(`成功读取文件，大小: ${figmaJsonData.length} 字符`);

    // 解析JSON以验证
    const figmaData = JSON.parse(figmaJsonData);
    console.log(`成功解析JSON，包含${figmaData.nodes?.length || 0}个顶层节点`);

    // 测量处理时间
    console.time('schema-transform');

    // 执行转换
    console.log('开始转换Figma数据为标准Schema...');
    const standardSchema = transformFigmaJsonToSchema(figmaJsonData);

    // 输出处理时间
    console.timeEnd('schema-transform');

    // 生成诊断报告
    const diagnostics = generateSchemaDiagnostics(figmaData, standardSchema);
    console.log('Schema转换诊断:', JSON.stringify(diagnostics, null, 2));

    // 输出部分Schema
    const schemaStr = JSON.stringify(standardSchema, null, 2);
    console.log('转换后的Schema示例(前1000字符):', schemaStr.substring(0, 1000) + '...');

    // 保存转换结果到文件
    const outputPath = path.join(path.dirname(figmaJsonPath), 'converted-schema.json');
    fs.writeFileSync(outputPath, schemaStr);
    console.log(`转换完成！Schema已保存到: ${outputPath}`);

    return {
      success: true,
      schema: standardSchema,
      diagnostics,
      outputPath
    };
  } catch (error) {
    console.error('测试过程中出错:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * 使用内置测试数据进行转换测试
 * 不需要提供外部文件，直接使用代码中的testData
 */
async function testWithInternalData() {
  try {
    console.log('开始使用内置测试数据进行转换...');

    // 将测试数据转换为JSON字符串
    const figmaJsonData = JSON.stringify(testData, null, 2);
    console.log(`测试数据大小: ${figmaJsonData.length} 字符`);

    // 测量处理时间
    console.time('schema-transform');

    // 执行转换
    console.log('开始转换Figma数据为标准Schema...');
    const standardSchema = transformFigmaJsonToSchema(figmaJsonData);

    // 输出处理时间
    console.timeEnd('schema-transform');

    // 生成诊断报告
    const diagnostics = generateSchemaDiagnostics(testData, standardSchema);
    console.log('Schema转换诊断:', JSON.stringify(diagnostics, null, 2));

    // 输出部分Schema
    const schemaStr = JSON.stringify(standardSchema, null, 2);
    console.log('转换后的Schema示例(前1000字符):', schemaStr.substring(0, 1000) + '...');

    // 保存转换结果到文件（如果在node环境下）
    try {
      const fs = require('fs');
      const path = require('path');
      const outputPath = path.join(process.cwd(), 'converted-schema.json');
      fs.writeFileSync(outputPath, schemaStr);
      console.log(`转换完成！Schema已保存到: ${outputPath}`);
    } catch (_) {
      // 忽略文件系统错误
      console.log('非Node环境或无法写入文件，仅输出转换结果');
    }

    return {
      success: true,
      schema: standardSchema,
      diagnostics
    };
  } catch (error) {
    console.error('测试过程中出错:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * 命令行入口函数
 */
async function main() {
  if (process.argv.length < 3) {
    console.log('未提供Figma JSON文件路径，将使用内置测试数据');
    await testWithInternalData();
    process.exit(0);
  }

  const figmaJsonPath = process.argv[2];
  const result = await testFigmaTransformer(figmaJsonPath);

  if (result.success) {
    console.log(`\n测试成功! 转换后的Schema已保存到: ${result.outputPath}`);
    process.exit(0);
  } else {
    console.error(`\n测试失败: ${result.error}`);
    process.exit(1);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  main();
}

// 导出函数供外部使用
module.exports = {
  testFigmaTransformer,
  testWithInternalData
};