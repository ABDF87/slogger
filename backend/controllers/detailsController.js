const Detail = require('../model/Detail')

const getAllDetails = async (req, res) => {
    const details = await Detail.find();
    if (!details) return res.status(204).json({ 'message': 'No details found.' });
    res.json(details);
}

const createNewDetail = async (req, res) => {
    if(req) console.log(req)
    if ( !req?.body?.detailname || !req?.body?.projectid || !req?.body?.taskid) {
        return res.status(400).json({ 'message': 'User id and task name are required' });
    }

    try {
        const result = await Detail.create({
            userid: req.body.userid,
            detailname: req.body.detailname,
            projectid: req.body.projectid,
            taskid: req.body.taskid,
            isActive:  req.body.isActive,
            timetask: req.body.timetask,
            taskpost:req.body.taskpost

        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateDetail = async (req, res) => {
    if (!req?.body?.taskid) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
console.log(req.body.taskid)
    const detail = await Detail.findOne({ taskid: req.body.taskid, projectid:req.body.projectid }).exec();
    if (!detail) {
        return res.status(204).json({ "message": `No project matches ID ${req.body.taskid}.` });
    }
    // if (req.body?.userid) project.userid = req.body.userid;
    if (req.body?.detailname) detail.detailname = req.body.detailname;
    // if (req.body?.projectid) detail.projectid = req.body.projectid;
    // if (req.body?.taskid) detail.detailid = req.body.taskid;
    if (req.body?.taskpost) detail.taskpost = req.body.taskpost;
    // if (req.body?.isActive) project.isActive = req.body.isActive;

    const result = await detail.save();
    res.json(result);
}

const deleteDetail = async (req, res) => {
    if (!req?.body?.taskid) return res.status(400).json({ 'message': 'Task ID required.' });

    const detail = await Detail.findOne({ taskid: req.body.taskid }).exec();
    if (!detail) {
        return res.status(204).json({ "message": `No task matches ID ${req.body.taskid}.` });
    }
    const result = await detail.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const deleteAllDetails = async (req, res) => {
    if (!req?.body?.projectid) return res.status(400).json({ 'message': 'Project ID required.' });
    const result = await Detail.deleteMany({projectid: req.body.projectid}); //{ _id: req.body.id }
    res.json(result);
}


const getDetail = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Task ID required.' });

    const detail = await Detail.find({ userid: req.params.id }).exec();
    if (!detail) {
        return res.status(204).json({ "message": `No project matches ID ${req.params.id}.` });
    }
    res.json(detail);
}

module.exports = {
    getAllDetails,
    createNewDetail,
    updateDetail,
    deleteDetail,
    deleteAllDetails,
    getDetail
   
}