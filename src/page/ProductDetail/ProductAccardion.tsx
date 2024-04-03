import { useRef, useState } from "react";
import styles from "./ProductDetail.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface AccardionProps {
    id: number;
    name: string;
    desctiption: string;
    country: string;
    color: string;
    floor: string;
    compound: string[];
}

const ProductAccardion = (props: AccardionProps) => {
    const [accardionId, setAccardionId] = useState<number | null>(null);
    const ref = useRef<HTMLElement | null>(null);

    const handleClickAccardion = (id: number) => {
        if (id === accardionId) setAccardionId(null);
        else setAccardionId(id);
    };

    const TABS_ELEMENT = [
        {
            id: 0,
            name: "Описание",
            desctiption: props?.desctiption,
        },
        {
            id: 1,
            name: "Характеристики",
            description: [
                <p style={{ marginBottom: "10px" }}>Пол: {props.floor}</p>,
                <p style={{ marginBottom: "10px" }}>Цвет: {props.color}</p>,
                <p style={{ marginBottom: "10px" }}>
                    Страна: {props?.country}
                </p>,
                <p>
                    Состав:
                    {props?.compound.map((comp, index: number) => (
                        <span key={index}> {String(comp).split(",")}</span>
                    ))}
                </p>,
            ],
        },
        {
            id: 2,
            name: "Возврат и обмен",
            description: [
                "Перед отправкой обмена обязательно свяжитесь с нашим менеджером",
                <p style={{ color: "red", textDecoration: "underline" }}>
                    obmen@sneaker.ru
                </p>,
                <p style={{ color: "red", textDecoration: "underline" }}>
                    Подробные правила возврата товара
                </p>,
            ],
        },
        {
            id: 3,
            name: "Доставка",
            description: [
                "Доставка курьером в интервал 13:00-20:00 в пределах МКАД 350 руб.",
                "Доставка 'день в день' в пределах МКАД (при заказе до 16:00).",
                "Почта России. Срок доставки от 4 до 14 дней.",
                "СДЕК. Сроки доставки 3-7 рабочих дней.",
                "Боксберри. Сроки доставки 3-7 рабочих дней.",
            ],
        },
    ];

    return (
        <div className={styles["product-accordions"]}>
            {TABS_ELEMENT.map((tab, id) => (
                <ul className={styles["product-accordion"]} key={id}>
                    <li onClick={() => handleClickAccardion(id)}>
                        <div className={styles["accordion-name"]}>
                            <h3>{tab.name}</h3>

                            {id === accardionId ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            )}
                        </div>
                        <div
                            className={`${styles["accordion-collapse"]} ${
                                id === accardionId ? styles["active"] : ""
                            }`}
                            style={
                                id === accardionId && ref.current
                                    ? {
                                          height: `${ref.current.clientHeight}px`,
                                      }
                                    : { height: "0px" }
                            }
                        >
                            <div
                                ref={(element) => {
                                    if (element) {
                                        ref.current = element;
                                    }
                                }}
                                className={styles["accordion-body"]}
                            >
                                {Array.isArray(tab.description) ? (
                                    <ul>
                                        {tab.description.map((item, index) => (
                                            <li
                                                style={{ marginBottom: "10px" }}
                                                key={index}
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    tab.desctiption
                                )}
                            </div>
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default ProductAccardion;
