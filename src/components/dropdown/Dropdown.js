import React, { useEffect, useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ ...options }) => {
    /* mini version = redux, fn comopnent feature */
    const [processed_opts, setProcessed_opts] = useState();
    const [expanded, setExpanded] = useState(false);
    const [selectAll, setSelectAll] = useState(false)

    useEffect(() => {
        /* map || reduce fn to add a checked field for multiple processed_opts */
        let tmp_data = options.options.options.map((item) => {
            let tmp_obj = item;
            tmp_obj.isChecked = false;
            return tmp_obj;
        });
        tmp_data.selectAll = false
        setProcessed_opts(tmp_data)
        setProcessed_opts(tmp_data);

    }, []);

    const toggleExpanded = () => {
        if (!expanded) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    };
    const handleChange = (e) => {
        const filtered = processed_opts.filter((name) => name !== e.target.name);
        let tmp_data = [...processed_opts]
        tmp_data[e.target.dataset.rowid].isChecked = e.target.checked
        setProcessed_opts(tmp_data)
        setProcessed_opts(filtered);
    };

    const selectAllHandler = () => {
        let tmp = [...processed_opts]

        let tmpArr = tmp.map(item => {
            let tmp_item = item
            tmp_item.isChecked = !selectAll
            return tmp_item
        })
        setSelectAll(!selectAll)
        setProcessed_opts(tmpArr)
    }




    return (
        <main className="main__div">
            <div className="searchbar__div" onClick={toggleExpanded}>
                <div
                    className={`font - semibold cursor - pointer ${expanded ? "up-arrow" : "down-arrow"
                        } `}
                >
                    {processed_opts
                        ? processed_opts.filter(item => item.isChecked === true).map((name, i) => (
                            <span key={i}>

                                {i ? ", " : null} {name.value}
                            </span>
                        ))
                        : "None selected"}
                </div>
            </div >

            {expanded && (
                <div className=" expanded__div">

                    {/* diselect All*/}
                    <input
                        type="checkbox"
                        checked={processed_opts.isChecked}
                        onChange={e => selectAllHandler(e)}
                        className="m-3 cursor-pointer"
                    /> <span>SelectAll</span>


                    {processed_opts &&
                        processed_opts.map((opt, idx) => (
                            <label
                                value={opt.value}

                                className="block__label" key={idx}>
                                <input
                                    data-rowid={idx}
                                    type="checkbox"
                                    name={opt.value}
                                    checked={opt.isChecked}
                                    onChange={e => handleChange(e)}
                                    className="m-3 cursor-pointer"
                                />
                                {opt.value}
                            </label>
                        ))}
                </div>
            )}
        </main >
    );
};

const DropDownContainer = ({ ...options }) => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-1/2 h-16  text-black-100 flex items-center justify-center text-xl">
                <Dropdown options={options} />
            </div>
        </div>
    );
};

export default DropDownContainer;
