import cn from "classnames";
import { memo } from "react";
import { Icon } from "@/common/Icon";

export const Logo = memo(function Logo(props: {
    className?: string
}) {
    return (
        <div className={cn("flex items-center gap-x-2 text-183c4a", props.className)}>
            <Icon className="h-full aspect-square" name="worldcoin"/>
            <Icon className="h-1/3 justify-self-center aspect-square" name="cross"/>
            <Icon className="h-full aspect-square" name="lens"/>
        </div>
    )
})