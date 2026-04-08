import { useEffect, useState } from "react";
import { useTableStore } from "@/store";

const TABLE_NUMBER = "93";
const WIFI_PASSWORD = "PPPPPPP";

export function useInfoMejaModal() {
    const isOpen = useTableStore((s) => s.isInfoOpen);
    const closeInfo = useTableStore((s) => s.closeInfo);
    const setTableInfo = useTableStore((s) => s.setTableInfo);
    const tableInfo = useTableStore((s) => s.tableInfo)
    
    const [customerName, setCustomerName] = useState(
        tableInfo?.customerName ?? ""
    );

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    function handleSave() {
        setTableInfo({
            tableNumber: TABLE_NUMBER,
            customerName,
            wifiPassword: WIFI_PASSWORD,
        });
        closeInfo();
    }

    return {
        isOpen,
        customerName,
        setCustomerName,
        handleSave,
        closeInfo,
    }
}