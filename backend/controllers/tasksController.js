const Task = require('../model/Task')

const getAllTasks = async (req, res) => {
    const tasks = await Task.find();
    if (!tasks) return res.status(204).json({ 'message': 'No tasks found.' });
    res.json(tasks);
}

const createNewTask = async (req, res) => {
    if(req) console.log(req)
    if ( !req?.body?.taskname || !req?.body?.projectid || !req?.body?.taskid) {
        return res.status(400).json({ 'message': 'User id and task name are required' });
    }

    try {
        const result = await Task.create({
            userid: req.body.userid,
            taskname: req.body.taskname,
            projectid: req.body.projectid,
            taskid: req.body.taskid,
            isActive:  req.body.isActive,
            taskpost:req.body.taskpost,
            isCritical:req.body.isCritical
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateTask = async (req, res) => {
    if (!req?.body?.taskid) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const task = await Task.findOne({ taskid: req.body.taskid  }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No project matches ID ${req.body.taskid}.` });
    }
    // if (req.body?.userid) project.userid = req.body.userid;
    if (req.body?.taskname) task.taskname = req.body.taskname;
    // check this part
    if (req.body?.projectid) project.projectid = req.body.projectid;
    if (req.body?.taskid) task.taskid = req.body.taskid;
    if (req.body?.isCritical) task.isCritical = req.body.isCritical;
    // if (req.body?.isActive) project.isActive = req.body.isActive;

    const result = await task.save();
    res.json(result);
}

const deleteTask = async (req, res) => {
    if (!req?.body?.taskid) return res.status(400).json({ 'message': 'Task YO ID required.' });

    const task = await Task.findOne({ taskid: req.body.taskid }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No task matches ID ${req.body.taskid}.` });
    }
    const result = await task.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const deleteAllTask = async (req, res) => {
    if (!req?.body?.projectid) return res.status(400).json({ 'message': 'Project ID required.' });
    const result = await Task.deleteMany({projectid: req.body.projectid}); //{ _id: req.body.id }
    res.json(result);
}

const getTask = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Task ID required.' });

    const task = await Task.find({ userid: req.params.id }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No project matches ID ${req.params.id}.` });
    }
    res.json(task);
}

module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask,
    deleteAllTask,
    getTask
}