import {useAppSelector} from "../../../../../Redux/hooks.tsx";
import styled from "styled-components";
import styles from "../../../../../TextModule.module.css"

export default function LogSubMenu() {
    const logs = useAppSelector(x => x.gameState.gameState.logs)

    // The redux array is immutable or frozen, meaning it cannot be modified directly.
    // Creating a copy of it before sorting it
    const sortedLogs = [...logs].sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());

    return (
        <div
            style={{
                overflow: "scroll",
                backgroundColor: "black",
                height: "100%",
            }}
        >
            <ul
                style={{
                    marginTop: "1rem",
                }}>
                {sortedLogs.map((x, i) => (
                    <li id={x.id}>
                        <div
                            className={styles.pixelfont}
                            style={{
                                width: "100%",
                                overflowWrap: "break-word",
                                color: "white"
                            }}>
                            {`${new Date(x.created).toUTCString()} ${x.createdBy} ${x.eventText}`}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}


