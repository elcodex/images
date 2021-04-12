import { useContext, forwardRef } from 'react';
import { ImagesContext } from '../../store/ImagesStore';
import { getImages } from '../../helpers/parseHelper';

import './fileInput.less';

const SelectFile = forwardRef(({}, ref) => {
    const { updateState } = useContext(ImagesContext);

    async function handleChangeFiles(event) {
        if (event.target.files?.length) {
            const files = event.target.files;
            try {
                const images = await getImages(files);
                updateState({type: 'append', payload: images});
            } catch(error) {
                console.log(error.message);
            }
        }
    }

    return (
        <input
            className="file-input"
            type='file'
            accept='image/*,.json'
            ref={ref} 
            multiple={true}
            onChange={handleChangeFiles}
        />
    );
});

export default SelectFile;