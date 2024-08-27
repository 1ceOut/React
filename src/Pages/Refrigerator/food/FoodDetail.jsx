import React, { useState } from "react";
import MenuNavigate from "../../../components/Common/MenuNavigate";
import { useEffect } from "react";

const FoodDetail = () => {

    // 팝업 상태를 관리하는 useState
    const [showPopup, setShowPopup] = useState(false);
    // 갯수 상태를 초기화
    const [count, setCount] = useState('');

    // 팝업을 토글하는 함수
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

     // 갯수를 저장하거나 처리하는 함수
     const handleSave = () => {
      alert(`저장된 갯수: ${count}`);
      // 실제 저장 로직을 여기에 추가해야함.
  };

  const [animationClass, setAnimationClass] = useState('animate-slideInUp');

  useEffect(() => {
      setAnimationClass('animate-slideInUp');

      return () => {
          setAnimationClass('animate-slideOutDown');
      };
  }, []);

    return (
        <main className={`${animationClass} flex flex-col items-center px-6 pt-5 pb-2 mx-auto w-full max-w-[390px] h-screen overflow-auto`}>
            <MenuNavigate option={"상품 상세"} alertPath="/addinfo/habit" />
            <div style={{
                position: 'relative',
                width: '342px',
                height: '60px',
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        backgroundColor: '#F0F0F0'
                    }}>
                        <img src="/assets/milkcow.png" alt="" style={{
                            width: '40px',
                            height: '40px',
                        }} />
                    </div>
                    <div>
                        <div style={{
                            width: 114,
                            height: 17,
                            top: 140,
                            left: 96,
                            fontSize: 14,
                            fontWeight: 400,
                            color: '#767676',
                            marginLeft: 12
                        }}>유제품.동물성.우유</div>
                        <div style={{
                            fontSize: 18,
                            marginTop: 8,
                            marginLeft: 12
                        }}>서울우유 플레인 요거트 순수..</div>
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                    fontSize: '14px',
                    cursor: 'pointer'
                }}>
                    {/* 팝업을 토글하는 onClick 이벤트 */}
                    <img
                        src="/assets/trashbox.png"
                        alt="Trashbox"
                        style={{ width: 28, height: 28 }}
                        onClick={togglePopup}
                    />
                </div>
            </div>
            <div style={{ width: 342, height: 87, marginTop: 32 }}>
                <p style={{ width: 28, height: 19, fontSize: 16 }}>갯수</p>
                <input type="text"
                 value={count}
                    onChange={(e) => setCount(e.target.value)} // 입력 필드 값 변경 시 상태 업데이트
                      style={{
                        width: '342px', height: '56px',  borderRadius: '12px', marginTop: '12px',
                          border: '1px solid #E1E1E1',fontSize: '16px',   padding: '0 0 0 20px',
                           margin: '18px 0 0 0', boxSizing: 'border-box', display: 'block',  lineHeight: '19px'}} />

            </div>
            <div style={{ width: 342, height: 87, marginTop: 20 }}>
                <p style={{ width: 56, height: 19, fontSize: 16, fontWeight: 500 }}>유통기한</p>
                <div style={{ width: 342, height: 56, borderRadius: 12, marginTop: 12, background: '#F4F4F4', position: 'relative' }}>
                    <p style={{ width: 78, height: 19, fontWeight: 500, fontSize: 16, color: '#9C9C9C', position: 'absolute', top: 18, left: 20 }}>
                        2024.07.30
                    </p>
                </div>
            </div>
            <div style={{ width: 342, height: 87, marginTop: 20 }}>
                <p style={{ width: 56, height: 19, fontSize: 16, fontWeight: 500 }}>등록일</p>
                <div style={{ width: 342, height: 56, borderRadius: 12, marginTop: 12, background: '#F4F4F4', position: 'relative' }}>
                    <p style={{ width: 78, height: 19, fontWeight: 500, fontSize: 16, color: '#9C9C9C', position: 'absolute', top: 18, left: 20 }}>
                        2024.07.27
                    </p>
                </div>
            </div>
            <div style={{ width: 390, height: 16, top: 551, background: '#F4F4F4', marginTop: 32 }}></div>

            <div
                style={{
                    border: "2px solid black",
                    width: "342px",
                    fontFamily: "Arial, sans-serif",
                    color: "#333",
                    padding: "10px",
                }}
            >
                <div style={{ textAlign: "left" }}>
                    <h2 style={{ fontSize: "1.5em", margin: 0 }}>영양정보</h2>
                    <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#aaa" }}>
                        총 내용량 300g(100g x 3개)
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#aaa" }}>
                        1개(100g)당 <strong style={{ fontSize: "1.2em", color: "black" }}>35kcal</strong>
                    </p>
                </div>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    textAlign: "left",
                                    fontSize: "0.8em",
                                    color: "#777",
                                    paddingBottom: "5px",
                                }}
                            >
                                1개당
                            </th>
                            <th
                                style={{
                                    textAlign: "left",
                                    fontSize: "0.8em",
                                    color: "#777",
                                    paddingBottom: "5px",
                                }}
                            >
                                1일 영양성분 기준치에 대한 비율
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                섬유질 0mg
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                탄수화물 2g
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                1%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                당분 0g
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                지방 0g
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                1%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                칼슘 0g
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                수분 0g
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                1%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                콜레스테롤 0mg
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                염분 0mg
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                0%
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "left",
                                    fontSize: "1em",
                                    color: "#555",
                                }}
                            >
                                단백질 6g
                            </td>
                            <td
                                style={{
                                    borderTop: "1px solid #ddd",
                                    padding: "5px 0",
                                    textAlign: "right",
                                    fontSize: "1em",
                                    color: "black",
                                }}
                            >
                                12%
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    style={{
                        marginTop: "15px",
                        fontSize: "0.8em",
                        color: "#777",
                        textAlign: "left",
                        lineHeight: "1.2em",
                    }}
                >
                    <p>
                        1일 영양성분 기준치에 대한 비율(%)은 2,000kcal 기준이며 개인의 필요
                        열량에 따라 다를 수 있습니다.
                    </p>
                </div>
            </div>
            <button  onClick={handleSave} style={{ 
              width: '342px', 
              height: '56px', 
              borderRadius: '12px', 
              background: '#2377EF', 
              marginTop: '30px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              lineHeight: '56px',
              fontSize:16,
              color:'#FFFFFF'
          }}>
              저장
          </button>


            {/* 팝업창 */}
            {showPopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            width: "342px",
                            height: "224px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: '#F2F2F2',
                            marginBottom: 20,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <img src="/assets/milkcow.png" alt="milkcow" style={{
                                width: '40px',
                                height: '40px',
                            }} />
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                            선택하신 상품을 정말 삭제 하시겠어요?
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                            <button
                                onClick={togglePopup}
                                style={{
                                    width: '48%',
                                    height: 56,
                                    borderRadius: 12,
                                    border: '1px solid #E1E1E1',
                                    cursor: "pointer"
                                }}
                            >
                                아니오
                            </button>
                            <button
                                onClick={() => {
                                    // 실제 삭제 로직을 여기에 추가
                                    console.log("삭제됨");
                                    togglePopup();
                                }}
                                style={{
                                    width: '48%',
                                    height: 56,
                                    borderRadius: 12,
                                    border: '1px solid #E1E1E1',
                                    cursor: "pointer"
                                }}
                            >
                                네
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default FoodDetail;
