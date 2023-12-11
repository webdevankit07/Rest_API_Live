const { Product } = require('../models/productModel');

exports.getALLProducts = async (req, res) => {
    try {
        const { search, brand, title, category, sort, select, page, limit } = req.query;
        let queryObject = {};
        let apiData;

        //! ......... Filtering ............ //
        search && (queryObject.title = { $regex: search, $options: 'i' });
        title && (queryObject.title = { $regex: title, $options: 'i' });
        brand && (queryObject.brand = { $regex: brand, $options: 'i' });
        category && (queryObject.category = { $regex: category, $options: 'i' });
        apiData = Product.find(queryObject);

        //! ......... Sorting ............ //
        if (sort) {
            let sortFix = sort.split(',').join(' ');
            apiData = apiData.sort(sortFix);
        }

        //! ....... Finding Select items ....... //
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        //! ....... Pagination ....... //
        let Page = +page || 1;
        let Limit = +limit || 10;
        let skip = (Page - 1) * Limit;
        const leftRange = skip + 1;
        const rightRange = Limit * Page || Limit;
        apiData = apiData.skip(skip).limit(Limit);

        //! ....... Sending Response ....... //
        console.log(queryObject);
        const products = await apiData;
        res.status(200).json({
            products,
            pageNo: Page,
            itemRange: `${leftRange}-${rightRange}`,
            nbHits: products.length,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
